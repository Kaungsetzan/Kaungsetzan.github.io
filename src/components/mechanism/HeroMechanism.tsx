"use client";

import { useEffect, useRef } from "react";
import { angleB, angleC, crankSlider, DRAG_RATIO, followerX, GEAR_A, GEAR_B, GEAR_C, pawlLift, springPath } from "@/lib/mechanism";
import {
  Balloons,
  CamFollower,
  CenterLines,
  ConnectingRod,
  Cylinder,
  Dimensions,
  GearA,
  GearB,
  GearC,
  needleAngle,
  Pawl,
  Piston,
  Tachometer,
} from "./parts";

const CRUISE = 12; // deg/s of gear A = 2 RPM
const MAX_SPEED = 720; // deg/s
const START = { a: 0, b: angleB(0), c: angleC(0), crank: crankSlider(angleB(0)) };

interface Spring {
  x: number;
  v: number;
  t: number;
}
function stepSpring(s: Spring, dt: number, k: number, c: number) {
  const n = Math.max(1, Math.ceil(dt / 0.008));
  const h = dt / n;
  for (let i = 0; i < n; i++) {
    s.v += (-k * (s.x - s.t) - c * s.v) * h;
    s.x += s.v * h;
  }
}

/**
 * A ratchet-driven mechanism that turns slowly on its own. Visitors can drag or
 * flick any gear: it spins up and coasts back down like a flywheel. Holding a gear
 * stops it; dragging backwards does nothing because the pawl blocks reverse.
 */
export function HeroMechanism() {
  const svg = useRef<SVGSVGElement>(null);
  const gA = useRef<SVGGElement>(null);
  const gB = useRef<SVGGElement>(null);
  const gC = useRef<SVGGElement>(null);
  const pawl = useRef<SVGGElement>(null);
  const needle = useRef<SVGGElement>(null);
  const readout = useRef<SVGTextElement>(null);
  const rodOuter = useRef<SVGLineElement>(null);
  const rodInner = useRef<SVGLineElement>(null);
  const piston = useRef<SVGGElement>(null);
  const follower = useRef<SVGGElement>(null);
  const spring = useRef<SVGPathElement>(null);

  useEffect(() => {
    const root = svg.current;
    if (!root) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const cruise = reduce ? 0 : CRUISE;

    let a = 0; // gear A angle, degrees
    let w = cruise; // gear A speed, deg/s
    let drag: null | { id: number; c: readonly [number, number]; k: number; last: number; t: number; w: number; el: Element } = null;
    let lift = 0;
    let liftV = 0;
    let rpmText = "";
    const ndl: Spring = { x: needleAngle(2), v: 0, t: needleAngle(2) };

    // Only touch the DOM when a value actually changes.
    const written = new WeakMap<Element, Record<string, string>>();
    const set = (el: Element | null, attr: string, value: string) => {
      if (!el) return;
      const cache = written.get(el) ?? {};
      if (cache[attr] !== value) {
        cache[attr] = value;
        written.set(el, cache);
        el.setAttribute(attr, value);
      }
    };

    const frame = (dt: number) => {
      let speed: number;
      if (drag) {
        if (performance.now() - drag.t > 60) drag.w *= Math.pow(0.02, dt); // held still: slows to a stop
        speed = drag.w;
      } else {
        w += (cruise - w) * (1 - Math.exp(-dt / (w > cruise ? 2.6 : 1.2))); // coast down / spin back up
        a = (a + w * dt) % 5400; // 5400° = whole mechanism back to its start pose
        speed = w;
      }
      const tb = angleB(a);
      const tc = angleC(a);
      set(gA.current, "transform", `rotate(${a.toFixed(2)})`);
      set(gB.current, "transform", `rotate(${tb.toFixed(2)})`);
      set(gC.current, "transform", `rotate(${tc.toFixed(2)})`);

      // Pawl rides up each tooth, then snaps down under its spring.
      const target = pawlLift(a);
      if (target >= lift || reduce) {
        lift = target;
        liftV = 0;
      } else {
        liftV += 5200 * dt;
        lift = Math.max(target, lift - liftV * dt);
        if (lift <= target + 0.01) liftV = 0;
      }
      set(pawl.current, "transform", `rotate(${(-lift).toFixed(2)})`);

      const rpm = Math.abs(speed) / 6;
      ndl.t = needleAngle(rpm);
      stepSpring(ndl, dt, 90, 10);
      set(needle.current, "transform", `rotate(${ndl.x.toFixed(1)})`);
      const text = String(Math.round(rpm)).padStart(3, "0");
      if (readout.current && text !== rpmText) {
        rpmText = text;
        readout.current.textContent = text;
      }

      const { px, py, pistonY } = crankSlider(tb);
      for (const rod of [rodOuter.current, rodInner.current]) {
        set(rod, "x1", px.toFixed(2));
        set(rod, "y1", py.toFixed(2));
        set(rod, "y2", pistonY.toFixed(2));
      }
      set(piston.current, "transform", `translate(0 ${pistonY.toFixed(2)})`);

      const xf = followerX(tc);
      set(follower.current, "transform", `translate(${xf.toFixed(2)} ${GEAR_C.cy})`);
      set(spring.current, "d", springPath(xf));
    };

    // ---- animation loop, paused while the drawing is off-screen ----
    let raf = 0;
    let last = 0;
    const tick = (t: number) => {
      const dt = last ? Math.min((t - last) / 1000, 0.05) : 0;
      last = t;
      frame(dt);
      raf = requestAnimationFrame(tick);
    };
    const io = new IntersectionObserver(([entry]) => {
      cancelAnimationFrame(raf);
      last = 0;
      if (entry.isIntersecting) raf = requestAnimationFrame(tick);
    });
    io.observe(root);

    // ---- drag / flick ----
    const pointerAngle = (e: PointerEvent, c: readonly [number, number]) => {
      const ctm = root.getScreenCTM();
      if (!ctm) return 0;
      const p = new DOMPoint(e.clientX, e.clientY).matrixTransform(ctm.inverse());
      return (Math.atan2(p.y - c[1], p.x - c[0]) * 180) / Math.PI;
    };
    const gears = [
      [gA.current, [GEAR_A.cx, GEAR_A.cy], DRAG_RATIO.A],
      [gB.current, [GEAR_B.cx, GEAR_B.cy], DRAG_RATIO.B],
      [gC.current, [GEAR_C.cx, GEAR_C.cy], DRAG_RATIO.C],
    ] as const;
    const cleanups: (() => void)[] = [];
    for (const [el, c, k] of gears) {
      if (!el) continue;
      const down = (e: PointerEvent) => {
        if (e.button > 0) return;
        e.preventDefault();
        drag = { id: e.pointerId, c, k, last: pointerAngle(e, c), t: performance.now(), w: 0, el };
        el.classList.add("grabbing");
        el.setPointerCapture?.(e.pointerId);
      };
      // Stops the page scrolling when a finger starts on a gear.
      const touch = (e: TouchEvent) => e.preventDefault();
      el.addEventListener("pointerdown", down);
      el.addEventListener("touchstart", touch, { passive: false });
      cleanups.push(() => {
        el.removeEventListener("pointerdown", down);
        el.removeEventListener("touchstart", touch);
      });
    }
    const move = (e: PointerEvent) => {
      if (!drag || e.pointerId !== drag.id) return;
      const th = pointerAngle(e, drag.c);
      let dth = th - drag.last;
      drag.last = th;
      if (dth > 180) dth -= 360;
      else if (dth < -180) dth += 360;
      const da = Math.max(0, dth * drag.k); // the pawl stops it turning backwards
      const now = performance.now();
      const dts = Math.max(8, now - drag.t) / 1000;
      drag.t = now;
      a += da;
      drag.w = drag.w * 0.55 + Math.min(900, da / dts) * 0.45;
    };
    const up = (e: PointerEvent) => {
      if (!drag || e.pointerId !== drag.id) return;
      const flick = performance.now() - drag.t > 90 ? 0 : drag.w; // a pause before letting go = no flick
      w = Math.min(MAX_SPEED, Math.max(0, flick));
      drag.el.classList.remove("grabbing");
      drag = null;
    };
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);
    window.addEventListener("pointercancel", up);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      cleanups.forEach((fn) => fn());
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
      window.removeEventListener("pointercancel", up);
    };
  }, []);

  return (
    <figure className="m-0 w-full max-w-[600px]">
      <svg
        ref={svg}
        viewBox="10 14 530 420"
        className="hero-mech block w-full overflow-visible font-mono"
        role="img"
        aria-label="A ratchet-driven mechanism: three meshing gears (16, 10 and 12 teeth), a ratchet pawl, a crank driving a piston, a cam pushing a spring-loaded follower, and a tachometer. It turns slowly on its own; drag or flick a gear to spin it faster, or hold it to slow it down."
      >
        <Cylinder />
        <Piston ref={piston} y={START.crank.pistonY} />
        <GearA ref={gA} angle={START.a} />
        <GearB ref={gB} angle={START.b} />
        <GearC ref={gC} angle={START.c} />
        <ConnectingRod refOuter={rodOuter} refInner={rodInner} x1={START.crank.px} y1={START.crank.py} y2={START.crank.pistonY} />
        <CamFollower refFollower={follower} refSpring={spring} thetaC={START.c} />
        <Pawl ref={pawl} />
        <Tachometer refNeedle={needle} refReadout={readout} />
        <CenterLines />
        <Dimensions />
        <Balloons />
      </svg>
      <figcaption className="mt-2 text-center font-mono text-[11px] tracking-[0.1em] text-ink-muted">
        1 RATCHET &amp; PAWL · 2 CRANK-SLIDER · 3 CAM &amp; FOLLOWER · 4 TACHOMETER
        <span className="mt-1.5 block text-accent">↻ DRAG OR FLICK A GEAR · HOLD IT TO SLOW DOWN</span>
      </figcaption>
    </figure>
  );
}
