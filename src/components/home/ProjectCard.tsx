"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRef, useState, type ReactNode } from "react";
import { CornerBolts } from "@/components/blueprint/Bolts";
import type { Project } from "@/data/projects";

/**
 * A project drawn as a plate bolted to the sheet.
 * Hover / keyboard focus / first tap: a tracing-paper overlay lays the key facts over it.
 * Click: the card slides out like a drawing pulled from a flat-file drawer, then the
 * case study opens (and slides in on its own page).
 */
export function ProjectCard({ project, children, className = "" }: { project: Project; children?: ReactNode; className?: string }) {
  const router = useRouter();
  const href = `/projects/${project.slug}/`;
  const pointerType = useRef<string>("mouse");
  const [peek, setPeek] = useState(false);
  const [pulled, setPulled] = useState(false);

  const open = () => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setPulled(true);
    window.setTimeout(() => router.push(href), reduce ? 0 : 170);
  };

  return (
    <article
      className={`project-card relative flex min-w-0 cursor-pointer flex-col gap-3.5 border-[1.5px] border-ink bg-[rgba(18,55,102,0.85)] ${
        project.featured ? "p-7 sm:p-10" : "p-7"
      } ${peek ? "peek" : ""} ${pulled ? "pulled" : ""} ${className}`}
      onPointerDown={(e) => (pointerType.current = e.pointerType)}
      onKeyDown={() => (pointerType.current = "keyboard")}
      onMouseLeave={() => setPeek(false)}
      onClick={(e) => {
        e.preventDefault();
        if (pointerType.current === "touch" && !peek) return setPeek(true); // first tap shows the overlay
        open();
      }}
    >
      <CornerBolts />
      <TracingOverlay project={project} touch={peek} />
      <p className="m-0 font-mono text-xs tracking-[0.12em] text-accent">
        PART NO. {project.partNo}
        {project.assembly ? ` · ${project.assembly}` : ""}
      </p>
      <h3 className={`m-0 leading-none font-semibold uppercase ${project.featured ? "text-[clamp(30px,4.5vw,40px)]" : "text-[28px]"}`}>
        {project.title}
      </h3>
      <p className={`m-0 max-w-[620px] leading-snug ${project.featured ? "text-[19px]" : "text-[17px]"}`}>{project.cardLine}</p>
      {children}
      <ul className="m-0 flex list-none flex-wrap gap-2 p-0 font-mono text-xs">
        {project.tags.map((t) => (
          <li key={t} className="border border-ink px-2 py-1 uppercase">
            {t}
          </li>
        ))}
      </ul>
      <div className="mt-auto flex flex-wrap items-center justify-between gap-3 pt-1">
        <Link href={href} className="font-mono text-sm tracking-[0.06em] hover:text-accent" onClick={(e) => e.preventDefault()}>
          READ CASE STUDY →
        </Link>
        {project.privateNote && <span className="font-mono text-[11px] tracking-[0.1em] text-ink-muted">{project.privateNote.toUpperCase()}</span>}
      </div>
    </article>
  );
}

function TracingOverlay({ project, touch }: { project: Project; touch: boolean }) {
  return (
    <div className="vellum" aria-hidden="true">
      <span className="tape t1" />
      <span className="tape t2" />
      <p className="m-0 text-xs tracking-[0.14em] text-accent">DETAIL {project.partNo} · TRACING OVERLAY</p>
      <p className="m-0 font-sans text-[30px] leading-none font-bold uppercase">{project.title}</p>
      <ol className="v-list">
        {project.callouts.map((c, i) => (
          <li key={c.label}>
            <b>{String(i + 1).padStart(2, "0")}</b>
            <span>{c.label}</span>
            <em>{c.value}</em>
          </li>
        ))}
      </ol>
      <p className="mt-auto mb-0 text-[13px] tracking-[0.08em] text-accent">{touch ? "TAP AGAIN TO PULL THE DRAWING →" : "CLICK TO PULL THE DRAWING →"}
      </p>
    </div>
  );
}
