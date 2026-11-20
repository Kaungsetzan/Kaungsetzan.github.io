"use client";

import { useEffect, useRef, useState } from "react";
import type { Project } from "@/data/projects";

/**
 * Detail drawing beside the overview: the frame is drawn, then a leader spine,
 * then each numbered callout in turn. Starts when it scrolls into view;
 * shown complete straight away under reduced motion (see globals.css).
 */
export function OverviewDrawing({ project }: { project: Project }) {
  const ref = useRef<HTMLElement>(null);
  const [drawn, setDrawn] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setDrawn(true);
          io.disconnect();
        }
      },
      { threshold: 0.35 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <figure ref={ref} className={`ov-drawing relative m-0 self-start px-6 pt-5 pb-6 ${drawn ? "drawn" : ""}`}>
      <svg className="ov-frame pointer-events-none absolute inset-0 h-full w-full overflow-visible" aria-hidden="true">
        <rect x="0.75" y="0.75" width="calc(100% - 1.5px)" height="calc(100% - 1.5px)" pathLength={1} fill="none" stroke="var(--color-ink)" strokeWidth="1.5" />
      </svg>
      <figcaption className="ov-title mb-5 flex items-baseline justify-between gap-4 border-b border-ink/40 pb-3 font-mono text-[11px] tracking-[0.14em]">
        <span className="text-accent">DETAIL {project.partNo} · KEY FACTS</span>
        <span className="text-ink-muted">SCALE 1:1</span>
      </figcaption>
      <div className="relative pl-[18px]">
        <ol className="m-0 flex list-none flex-col gap-4 p-0">
          {project.callouts.map((c, i) => (
            <li key={c.label} className="relative grid grid-cols-[22px_1fr] items-start gap-x-3" style={{ "--i": i } as React.CSSProperties}>
              {i < project.callouts.length - 1 && (
                <span className="ov-spine absolute top-[11px] -left-[18px] h-[calc(100%+16px)] w-px bg-accent" aria-hidden="true" />
              )}
              <span className="ov-tick absolute top-[11px] -left-[18px] h-px w-[18px] bg-accent" aria-hidden="true" />
              <b className="ov-num inline-flex h-[22px] w-[22px] items-center justify-center rounded-full border border-ink font-mono text-[10px] font-normal">
                {String(i + 1).padStart(2, "0")}
              </b>
              <span className="ov-text flex flex-col gap-0.5">
                <span className="font-mono text-[11px] tracking-[0.1em] text-accent">{c.label}</span>
                <span className="text-[17px] leading-snug">{c.value}</span>
              </span>
            </li>
          ))}
        </ol>
      </div>
    </figure>
  );
}
