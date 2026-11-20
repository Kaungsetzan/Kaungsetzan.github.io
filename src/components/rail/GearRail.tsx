"use client";

import { useEffect, useRef, useState, type Ref } from "react";
import { gearPath, rackPath } from "@/lib/gears";

const INK = "#e6eefa";
const PAPER = "#123766";
const ACCENT = "#ffb547";

// The roller is a 12-tooth, module-4 gear rolling down a rack of the same module.
const MODULE = 4;
const PITCH = Math.PI * MODULE; // 12.5664: one tooth of travel
const X0 = 37.7; // roller centre at 0 %
const ROLLER = gearPath({ z: 12, m: MODULE });
const RACK = rackPath({ firstToothX: X0 - PITCH / 2 - 2 * PITCH, module: MODULE, pitchY: 51.8, backY: 64, length: 4021.2 });

type LeverMode = "down" | "up" | "stop";
const LEVER_LABEL: Record<LeverMode, string> = {
  down: "Scroll down slowly",
  up: "Back to top",
  stop: "Stop scrolling",
};

/**
 * Desktop scroll rail. The roller rolls down the rack as you scroll (one tooth per
 * step) and the rack works as a scrollbar: press or drag along it. The lever at the
 * bottom scrolls the page down slowly; at the very bottom it sends you back up.
 */
export function GearRail() {
  const track = useRef<HTMLDivElement>(null);
  const roller = useRef<SVGGElement>(null);
  const fill = useRef<SVGRectElement>(null);
  const pct = useRef<HTMLSpanElement>(null);
  const lever = useRef<SVGGElement>(null);
  const [mode, setMode] = useState<LeverMode>("down");
  const api = useRef<{ pull: () => void } | null>(null);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const roll = { x: 0, v: 0, t: 0 };
    const lev = { x: 0, v: 0, t: 0 };
    let auto: null | { dir: 1 | -1; y: number } = null;
    let currentMode: LeverMode = "down";
    let trackDrag: number | null = null;
    let raf = 0;
    let last = 0;

    const maxScroll = () => Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
    const steps = () => Math.max(1, Math.floor(((track.current?.clientHeight ?? 600) - X0 - 30) / PITCH));
    const spring = (s: typeof roll, dt: number, k: number, c: number) => {
      const n = Math.max(1, Math.ceil(dt / 0.008));
      for (let i = 0; i < n; i++) {
        s.v += (-k * (s.x - s.t) - c * s.v) * (dt / n);
        s.x += s.v * (dt / n);
      }
    };
    const stopAuto = () => {
      auto = null;
      lev.t = 0;
    };

    api.current = {
      pull() {
        if (auto) return stopAuto();
        const y = window.scrollY;
        if (y >= maxScroll() - 2) {
          lev.t = -1;
          if (reduce) {
            window.scrollTo(0, 0);
            lev.t = 0;
          } else auto = { dir: -1, y };
        } else {
          lev.t = 1;
          auto = { dir: 1, y };
        }
      },
    };

    const frame = (dt: number) => {
      const max = maxScroll();
      if (auto) {
        if (auto.dir < 0) auto.y = Math.max(0, auto.y - Math.min(2600, Math.max(240, auto.y * 2.4)) * dt);
        else auto.y = Math.min(max, auto.y + 70 * dt);
        window.scrollTo(0, Math.round(auto.y));
        if (auto.y <= 0 || auto.y >= max) stopAuto();
      }
      const prog = Math.min(1, Math.max(0, window.scrollY / max));
      roll.t = Math.round(prog * steps());
      if (reduce) roll.x = roll.t;
      else spring(roll, dt, 220, 16);
      const X = X0 + roll.x * PITCH;
      roller.current?.setAttribute("transform", `translate(${X.toFixed(2)} 27.8) rotate(${(roll.x * 30).toFixed(2)})`);
      fill.current?.setAttribute("width", Math.max(0, X).toFixed(1));
      if (pct.current) pct.current.textContent = `${Math.round(prog * 100)}%`;

      spring(lev, dt, 260, 18);
      lever.current?.setAttribute("transform", `rotate(${(lev.x * 40).toFixed(2)})`);
      const m: LeverMode = auto ? "stop" : window.scrollY >= max - 2 ? "up" : "down";
      if (m !== currentMode) {
        currentMode = m;
        setMode(m);
      }
    };
    const tick = (t: number) => {
      const dt = last ? Math.min((t - last) / 1000, 0.05) : 0;
      last = t;
      frame(dt);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    // Any manual scrolling input cancels the lever's auto-scroll.
    const cancel = () => auto && stopAuto();
    const onKey = (e: KeyboardEvent) => {
      if (auto && /^(Arrow|Page|Home|End| )/.test(e.key)) stopAuto();
    };
    const onScroll = () => {
      if (auto && Math.abs(window.scrollY - Math.round(auto.y)) > 4) stopAuto();
    };

    // The rack as a scrollbar.
    const seek = (e: PointerEvent) => {
      const el = track.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const prog = Math.min(1, Math.max(0, (e.clientY - r.top - X0) / (steps() * PITCH)));
      window.scrollTo(0, Math.round(prog * maxScroll()));
    };
    const onDown = (e: PointerEvent) => {
      if (e.button > 0) return;
      e.preventDefault();
      stopAuto();
      trackDrag = e.pointerId;
      track.current?.classList.add("grabbing");
      track.current?.setPointerCapture?.(e.pointerId);
      seek(e);
    };
    const onMove = (e: PointerEvent) => {
      if (trackDrag === e.pointerId) seek(e);
    };
    const onUp = (e: PointerEvent) => {
      if (trackDrag !== e.pointerId) return;
      trackDrag = null;
      track.current?.classList.remove("grabbing");
    };

    const t = track.current;
    t?.addEventListener("pointerdown", onDown);
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    window.addEventListener("pointercancel", onUp);
    window.addEventListener("wheel", cancel, { passive: true });
    window.addEventListener("touchstart", cancel, { passive: true });
    window.addEventListener("keydown", onKey);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      t?.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("pointercancel", onUp);
      window.removeEventListener("wheel", cancel);
      window.removeEventListener("touchstart", cancel);
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <aside
      aria-label="Scroll controls"
      className="fixed inset-y-0 right-0 z-10 hidden w-[76px] flex-col items-center gap-2.5 border-l-[1.5px] border-ink bg-[rgba(15,46,87,0.94)] py-3 font-mono text-[11px] tracking-[0.08em] min-[601px]:flex"
    >
      <div ref={track} className="scroll-track min-h-0 w-[72px] flex-1 overflow-hidden" aria-hidden="true">
        <svg width="72" className="block h-full">
          <g transform="matrix(0 1 1 0 4 0)">
            <path d={RACK} fill="none" stroke={INK} strokeWidth="1.3" strokeLinejoin="round" />
            <rect ref={fill} x="0" y="56" width="0" height="8" fill={ACCENT} opacity="0.4" />
            <g ref={roller} transform={`translate(${X0} 27.8) rotate(0)`}>
              <path d={ROLLER} fill={PAPER} stroke={INK} strokeWidth="1.6" strokeLinejoin="round" />
              <circle r="7" fill="none" stroke={INK} strokeWidth="1.4" />
              <circle r="2.5" fill={ACCENT} />
              <line x1="0" y1="-13" x2="0" y2="-7" stroke={ACCENT} strokeWidth="1.6" />
            </g>
          </g>
        </svg>
      </div>
      <span ref={pct} className="flex-none">
        0%
      </span>
      <button
        type="button"
        onClick={() => api.current?.pull()}
        aria-label={LEVER_LABEL[mode]}
        title={LEVER_LABEL[mode]}
        className="rail-lever mt-1 h-[84px] w-[72px] flex-none cursor-pointer border-0 bg-transparent p-0"
      >
        <Lever ref={lever} />
      </button>
    </aside>
  );
}

/** Side view of a throw lever: bolted housing on the right, handle and ball knob reaching left. */
function Lever({ ref }: { ref: Ref<SVGGElement> }) {
  const arm = 36;
  const pivot = -17;
  const arcPt = (deg: number) =>
    `${(pivot + arm * Math.cos((deg * Math.PI) / 180)).toFixed(2)} ${(arm * Math.sin((deg * Math.PI) / 180)).toFixed(2)}`;
  return (
    <svg width="72" height="84" viewBox="-36 -42 72 84" aria-hidden="true">
      <g transform="scale(-1 1)">
        <path d={`M${arcPt(-44)} A${arm} ${arm} 0 0 1 ${arcPt(44)}`} fill="none" stroke={INK} strokeWidth="0.7" strokeDasharray="2 3" opacity="0.6" />
        <rect x="-33" y="-17" width="26" height="34" rx="3" fill={PAPER} stroke={INK} strokeWidth="1.5" />
        <rect x="-29" y="-13" width="18" height="26" rx="1.5" fill="none" stroke={INK} strokeWidth="0.6" opacity="0.6" />
        {[[-29.5, -13.5], [-10.5, -13.5], [-29.5, 13.5], [-10.5, 13.5]].map(([x, y]) => (
          <circle key={`${x}${y}`} cx={x} cy={y} r="1.5" fill="none" stroke={INK} strokeWidth="0.8" />
        ))}
        <g transform={`translate(${pivot} 0)`}>
          <g ref={ref} transform="rotate(0)">
            <path d="M0 -4.5 L20 -2.6 L20 2.6 L0 4.5 Z" fill={PAPER} stroke={INK} strokeWidth="1.4" strokeLinejoin="round" />
            <rect x="19" y="-4.2" width="12" height="8.4" rx="2.4" fill={PAPER} stroke={INK} strokeWidth="1.4" />
            {[22.5, 25, 27.5].map((x) => (
              <line key={x} x1={x} y1="-4.2" x2={x} y2="4.2" stroke={INK} strokeWidth="0.7" />
            ))}
            <circle className="lever-knob" cx={arm} cy="0" r="6.5" fill={ACCENT} stroke={INK} strokeWidth="1.3" />
            <circle cx={arm - 2} cy="-2.2" r="1.6" fill="#fff3d6" opacity="0.8" />
          </g>
          <circle r="7.5" fill={PAPER} stroke={INK} strokeWidth="1.6" />
          <circle r="3.4" fill="none" stroke={INK} strokeWidth="1" />
          <path d="M-2.2 0 H2.2 M0 -2.2 V2.2" stroke={INK} strokeWidth="0.9" />
        </g>
      </g>
      <text x="-18.4" y="-31.6" textAnchor="middle" fontSize="7" fill="#c9d7ec">
        UP
      </text>
      <text x="-18.4" y="36.6" textAnchor="middle" fontSize="7" fill="#c9d7ec">
        DN
      </text>
    </svg>
  );
}
