import Link from "next/link";
import type { ReactNode } from "react";
import { CornerBolts } from "@/components/blueprint/Bolts";
import type { Project } from "@/data/projects";

/**
 * A project drawn as a plate bolted to the sheet. The whole plate is one link
 * (the "read case study" link stretches over it). On hover / keyboard focus the
 * plate lights up: accent outline, lighter fill, a soft glow and orange bolts.
 */
export function ProjectCard({
  project,
  figure,
  children,
  className = "",
}: {
  project: Project;
  /** shown above the part number, like the view on a drawing sheet */
  figure?: ReactNode;
  children?: ReactNode;
  className?: string;
}) {
  const href = `/projects/${project.slug}/`;
  return (
    <article
      className={`project-card relative flex min-w-0 flex-col gap-3.5 border-[1.5px] border-ink ${
        project.featured ? "p-7 sm:p-10" : "p-7"
      } ${className}`}
    >
      <CornerBolts />
      {figure}
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
          <li key={t} className="card-tag border border-ink px-2 py-1 uppercase">
            {t}
          </li>
        ))}
      </ul>
      <div className="mt-auto flex flex-wrap items-center justify-between gap-3 pt-1">
        <Link href={href} className="card-link font-mono text-sm tracking-[0.06em]">
          READ CASE STUDY <span className="card-arrow" aria-hidden="true">→</span>
          <span className="sr-only"> — {project.title}</span>
        </Link>
        {project.privateNote && <span className="font-mono text-[11px] tracking-[0.1em] text-ink-muted">{project.privateNote.toUpperCase()}</span>}
      </div>
    </article>
  );
}
