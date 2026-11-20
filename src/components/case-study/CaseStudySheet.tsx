import Link from "next/link";
import type { ReactNode } from "react";
import { CornerBolts } from "@/components/blueprint/Bolts";
import { projects, type Project } from "@/data/projects";
import {
  Architecture,
  ContextPlates,
  DecisionCards,
  NumberedList,
  Paragraphs,
  ScreenshotGallery,
  SheetSection,
  StackTable,
  StatsRow,
} from "./blocks";
import { OverviewDrawing } from "./OverviewDrawing";

/**
 * A project laid out as one engineering drawing. Sections are lettered in the
 * order they appear (A, B, C…), and each project only renders the blocks it has.
 */
function ToCome({ note }: { note: string }) {
  return (
    <p className="m-0 max-w-[760px] border-[1.5px] border-dashed border-ink/60 px-5 py-6 font-mono text-[13px] tracking-[0.08em] text-ink-muted">
      [ TO COME — {note.toUpperCase()} ]
    </p>
  );
}

export function CaseStudySheet({ project }: { project: Project }) {
  const cs = project.caseStudy;
  const sections: { kind: string; heading: string; body: ReactNode }[] = [];
  if (cs) {
    sections.push({
      kind: "SECTION",
      heading: "Overview",
      body: (
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(300px,380px)] lg:gap-10">
          <div className="flex flex-col gap-5">
            <h3 className="m-0 max-w-[760px] text-2xl leading-tight font-semibold">{cs.overview.heading}</h3>
            <Paragraphs items={cs.overview.paragraphs} />
          </div>
          <OverviewDrawing project={project} />
        </div>
      ),
    });
    const pending = (at: "context" | "results") =>
      cs.pending?.filter((p) => p.at === at).forEach((p) => sections.push({ kind: "DETAIL", heading: p.heading, body: <ToCome note={p.note} /> }));
    if (cs.context) sections.push({ kind: "DETAIL", heading: cs.context.heading, body: <ContextPlates points={cs.context.points} /> });
    pending("context");
    cs.galleries?.forEach((g) => sections.push({ kind: "VIEW", heading: g.heading, body: <ScreenshotGallery slug={project.slug} title={project.title} gallery={g} /> }));
    cs.lists?.filter((l) => l.early).forEach((l) => sections.push({ kind: l.kind, heading: l.heading, body: <NumberedList items={l.items} /> }));
    if (cs.architecture) sections.push({ kind: "SCHEMATIC", heading: cs.architecture.heading, body: <Architecture {...cs.architecture} /> });
    sections.push({ kind: "NOTES", heading: cs.decisions.heading, body: <DecisionCards items={cs.decisions.items} /> });
    cs.lists?.filter((l) => !l.early).forEach((l) => sections.push({ kind: l.kind, heading: l.heading, body: <NumberedList items={l.items} /> }));
    if (cs.results) sections.push({ kind: "TABLE", heading: "Results", body: <StatsRow stats={cs.results} /> });
    pending("results");
    sections.push({ kind: "BOM", heading: "Tech stack", body: <StackTable stack={cs.stack} /> });
  }

  const i = projects.findIndex((p) => p.slug === project.slug);
  const next = projects[(i + 1) % projects.length];

  return (
    <article className="drawing-sheet">
      <header className="relative flex flex-col gap-5 px-5 pt-10 pb-12 sm:px-8 sm:pt-12">
        <div className="flex flex-wrap items-center justify-between gap-3 font-mono text-xs tracking-[0.12em]">
          <Link href="/#work" className="border-[1.5px] border-ink px-3 py-2 no-underline hover:border-accent hover:text-accent">
            ← BACK TO DRAWER
          </Link>
          <span className="text-accent">
            DWG KSZ-0{project.partNo}-A · PART NO. {project.partNo}
            {project.assembly ? ` · ${project.assembly}` : ""}
            {cs?.period ? ` · ${cs.period}` : ""}
          </span>
        </div>
        <h1 className="m-0 text-[clamp(44px,8vw,80px)] leading-[0.95] font-bold uppercase">{project.title}</h1>
        <p className="m-0 max-w-[780px] text-[clamp(19px,2.4vw,23px)] leading-snug">{project.oneLiner}</p>
        {cs && (
          <table className="relative w-full max-w-[860px] border-collapse font-mono text-[13px]">
            <tbody>
              {cs.facts.map((f) => (
                <tr key={f.label}>
                  <th scope="row" className="w-36 border-[1.5px] border-ink px-3 py-2 text-left font-normal tracking-[0.08em] text-ink-muted">
                    {f.label}
                  </th>
                  <td className="border-[1.5px] border-ink px-3 py-2">{f.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        <div className="flex flex-wrap gap-3 font-mono text-sm tracking-[0.06em]">
          {project.links?.map((l) => (
            <a key={l.href} href={l.href} className="border-[1.5px] border-ink px-4 py-2.5 no-underline hover:border-accent hover:text-accent">
              {l.label.toUpperCase()} ↗
            </a>
          ))}
          {project.repo && (
            <a href={project.repo} className="border-[1.5px] border-ink px-4 py-2.5 no-underline hover:border-accent hover:text-accent">
              VIEW CODE ON GITHUB ↗
            </a>
          )}
          {project.privateNote && (
            <span className="border-[1.5px] border-dashed border-ink/60 px-4 py-2.5 text-ink-muted">{project.privateNote.toUpperCase()}</span>
          )}
        </div>
      </header>

      {sections.map((s, n) => (
        <SheetSection key={s.heading} letter={String.fromCharCode(65 + n)} kind={s.kind} heading={s.heading}>
          {s.body}
        </SheetSection>
      ))}

      <nav aria-label="Next project" className="border-t border-ink px-5 py-10 sm:px-8">
        <Link href={`/projects/${next.slug}/`} className="relative flex flex-wrap items-center justify-between gap-4 border-[1.5px] border-ink px-8 py-7 no-underline hover:border-accent">
          <CornerBolts />
          <span className="font-mono text-xs tracking-[0.12em] text-accent">NEXT DRAWING · PART NO. {next.partNo}</span>
          <span className="text-[clamp(26px,4vw,36px)] leading-none font-semibold uppercase">{next.title} →</span>
        </Link>
      </nav>
    </article>
  );
}
