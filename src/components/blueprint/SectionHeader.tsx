"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Section title with a hex bolt that turns a quarter turn when the section scrolls
 * into view, as if the heading were being bolted onto the sheet.
 */
export function SectionHeader({ label, title, id }: { label: string; title: string; id?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [tight, setTight] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setTight(entry.isIntersecting), {
      rootMargin: "0px 0px -35% 0px",
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className="flex flex-wrap items-baseline gap-4 border-b border-ink pb-3">
      <svg width="22" height="22" viewBox="-11 -11 22 22" aria-hidden="true" className="flex-none self-center">
        <g
          className="transition-transform duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] motion-reduce:transition-none"
          style={{ transform: `rotate(${tight ? 90 : 0}deg)` }}
        >
          <polygon points="10,0 5,8.66 -5,8.66 -10,0 -5,-8.66 5,-8.66" fill="none" stroke="currentColor" strokeWidth="1.4" />
          <line x1="-5" y1="0" x2="5" y2="0" stroke="var(--color-accent)" strokeWidth="1.8" />
        </g>
        <circle r="10.5" fill="none" stroke="currentColor" strokeWidth="0.6" strokeDasharray="2 2" />
      </svg>
      <span className="font-mono text-[13px] tracking-[0.14em] text-accent">{label}</span>
      <h2 id={id} className="m-0 text-[clamp(32px,5vw,44px)] leading-none font-semibold uppercase">
        {title}
      </h2>
    </div>
  );
}
