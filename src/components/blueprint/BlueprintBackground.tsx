"use client";

import { useEffect, useRef } from "react";

/**
 * The paper: a drafting grid plus faint background drawings, both sliding slowly to
 * the left like a sheet on a conveyor. Scrolling speeds the slide up briefly.
 * Moved with transforms only, so the browser never repaints the page for it.
 */
export function BlueprintBackground() {
  const grid = useRef<HTMLDivElement>(null);
  const sheet = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    let last = 0;
    let off = 0;
    let soff = 0;
    let boost = 0;
    let lastY = window.scrollY;

    const onScroll = () => {
      const y = window.scrollY;
      boost = Math.min(boost + Math.abs(y - lastY) * 0.8, 180);
      lastY = y;
    };
    const tick = (t: number) => {
      const dt = last ? Math.min((t - last) / 1000, 0.05) : 0;
      last = t;
      const step = dt * (10 + boost);
      boost *= Math.pow(0.08, dt);
      off = (off + step) % 120;
      soff = (soff + step) % 2400;
      if (grid.current) grid.current.style.transform = `translate3d(${-off.toFixed(1)}px,0,0)`;
      if (sheet.current) sheet.current.style.transform = `translate3d(${-soff.toFixed(1)}px,0,0)`;
      raf = requestAnimationFrame(tick);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      <div ref={grid} className="blueprint-grid absolute inset-y-0 left-0 -right-[120px] will-change-transform" />
      <div
        ref={sheet}
        className="absolute top-0 left-0 h-[2800px] w-[calc(100%+2400px)] opacity-10 will-change-transform"
        style={{ backgroundImage: "url(/sheet.svg)", backgroundRepeat: "repeat", backgroundSize: "2400px 2800px" }}
      />
    </div>
  );
}
