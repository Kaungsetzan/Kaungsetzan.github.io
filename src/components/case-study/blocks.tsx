import Image from "next/image";
import type { ReactNode } from "react";
import { PhoneFrame } from "@/components/blueprint/DeviceFrame";
import type { ArchTier, CaseStudy, Gallery, Shot } from "@/data/projects";

/** A lettered section of the drawing, e.g. "VIEW C — Mobile app". */
export function SheetSection({ letter, kind, heading, children }: { letter: string; kind: string; heading: string; children: ReactNode }) {
  const id = heading.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
  return (
    <section aria-labelledby={id} className="flex flex-col gap-6 border-t border-ink px-5 py-12 sm:px-8">
      <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
        <span className="font-mono text-[13px] tracking-[0.14em] text-accent">
          {kind} {letter}
        </span>
        <h2 id={id} className="m-0 text-[clamp(26px,4vw,36px)] leading-tight font-semibold uppercase">
          {heading}
        </h2>
      </div>
      {children}
    </section>
  );
}

export function Paragraphs({ items }: { items: string[] }) {
  return (
    <div className="flex max-w-[760px] flex-col gap-4 text-[19px] leading-normal">
      {items.map((p) => (
        <p key={p} className="m-0">
          {p}
        </p>
      ))}
    </div>
  );
}

/** Small plates for context / constraints. */
export function ContextPlates({ points }: { points: NonNullable<CaseStudy["context"]>["points"] }) {
  return (
    <ul className="m-0 grid list-none grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-4 p-0">
      {points.map((p, i) => (
        <li key={p.title} className="flex flex-col gap-2 border-[1.5px] border-ink p-5">
          <span className="font-mono text-xs tracking-[0.12em] text-accent">C{i + 1}</span>
          <strong className="text-xl leading-tight font-semibold uppercase">{p.title}</strong>
          <span className="text-[17px] leading-snug">{p.body}</span>
        </li>
      ))}
    </ul>
  );
}

function Placeholder({ shot, device }: { shot: Shot; device: Gallery["device"] }) {
  return (
    <div
      className={`flex items-center justify-center border-[1.5px] border-dashed border-ink/60 p-4 text-center font-mono text-xs tracking-[0.1em] text-ink-muted ${
        device === "phone" ? "aspect-[9/19.5] rounded-[22px]" : "aspect-[16/9.3]"
      }`}
    >
      [ {shot.caption.toUpperCase()} — SCREENSHOT TO COME ]
    </div>
  );
}

function BrowserFrame({ src, alt, width, height, href }: { src: string; alt: string; width: number; height: number; href: string }) {
  return (
    <a href={href} className="block border-[1.5px] border-ink bg-paper no-underline" aria-label={`${alt} (full size)`}>
      <span aria-hidden="true" className="flex items-center gap-1.5 border-b-[1.5px] border-ink px-2.5 py-1.5">
        <i className="h-2 w-2 rounded-full border border-ink" />
        <i className="h-2 w-2 rounded-full border border-ink" />
        <i className="h-2 w-2 rounded-full border border-ink" />
        <i className="ml-2 h-2 flex-1 border border-ink/50" />
      </span>
      <Image src={src} alt={alt} width={width} height={height} className="block h-auto w-full" sizes="(max-width: 700px) 100vw, 560px" />
    </a>
  );
}

export function ScreenshotGallery({ slug, title, gallery }: { slug: string; title: string; gallery: Gallery }) {
  const base = `/projects/${slug}`;
  const phone = gallery.device === "phone";
  if (gallery.privateNote) return <PrivateScreens note={gallery.privateNote} />;
  return (
    <ul
      className={`m-0 grid list-none gap-x-5 gap-y-7 p-0 ${
        phone ? "grid-cols-2 sm:grid-cols-3 lg:grid-cols-6" : "grid-cols-1 md:grid-cols-2"
      }`}
    >
      {gallery.shots.map((shot) => (
        <li key={shot.caption}>
          <figure className="m-0 flex flex-col gap-2.5">
            {shot.placeholder || !shot.file ? (
              <Placeholder shot={shot} device={gallery.device} />
            ) : phone ? (
              <PhoneFrame src={`${base}/${shot.file}.webp`} alt={shot.alt ?? `${title} ${phone ? "app" : "admin"} screen: ${shot.caption.toLowerCase()}`} width={shot.width!} height={shot.height!} />
            ) : (
              <BrowserFrame
                src={`${base}/${shot.file}-sm.webp`}
                href={`${base}/${shot.file}.webp`}
                alt={shot.alt ?? `${title} admin screen: ${shot.caption.toLowerCase()}`}
                width={800}
                height={Math.round((shot.height! * 800) / shot.width!)}
              />
            )}
            <figcaption className="font-mono text-xs tracking-[0.08em] text-ink-muted uppercase">{shot.caption}</figcaption>
          </figure>
        </li>
      ))}
    </ul>
  );
}

/** Stands in for screens that can't be shown because they hold a client's private data. */
function PrivateScreens({ note }: { note: NonNullable<Gallery["privateNote"]> }) {
  return (
    <div className="flex max-w-[860px] flex-col gap-4 border-[1.5px] border-dashed border-ink/60 px-6 py-6">
      <p className="m-0 flex items-center gap-3 font-mono text-[13px] tracking-[0.12em] text-accent">
        <svg width="14" height="16" viewBox="0 0 14 16" aria-hidden="true" className="flex-none">
          <rect x="1" y="7" width="12" height="8" fill="none" stroke="currentColor" strokeWidth="1.4" />
          <path d="M3.5 7V4.5a3.5 3.5 0 0 1 7 0V7" fill="none" stroke="currentColor" strokeWidth="1.4" />
        </svg>
        [ PRIVATE DATA — NOT SHOWN ]
      </p>
      <p className="m-0 max-w-[700px] text-[18px] leading-normal">{note.reason}</p>
      <div className="flex flex-col gap-2">
        <span className="font-mono text-[11px] tracking-[0.12em] text-ink-muted">SCREENS BUILT</span>
        <ul className="m-0 flex list-none flex-wrap gap-2 p-0 font-mono text-xs">
          {note.covers.map((c) => (
            <li key={c} className="border border-ink/70 px-2 py-1 uppercase">
              {c}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/** Block diagram: tiers stacked top to bottom, joined by labelled arrows. */
export function Architecture({ tiers, frame, notes }: NonNullable<CaseStudy["architecture"]>) {
  const tierEl = (t: ArchTier) => (
    <div className="flex flex-col gap-2">
      <span className="font-mono text-[11px] tracking-[0.14em] text-accent">{t.label}</span>
      <ul className="m-0 grid list-none grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-3 p-0">
        {t.nodes.map((n) => (
          <li key={n.title} className="border-[1.5px] border-ink bg-paper px-4 py-3">
            <strong className="block text-lg leading-tight font-semibold uppercase">{n.title}</strong>
            {n.lines.map((l) => (
              <span key={l} className="block font-mono text-xs leading-relaxed text-ink-muted">
                {l}
              </span>
            ))}
          </li>
        ))}
      </ul>
    </div>
  );
  const arrow = (label?: string) => (
    <div className="flex items-center gap-3 py-1 pl-6 font-mono text-[11px] tracking-[0.1em] text-ink-muted" aria-hidden={!label}>
      <svg width="14" height="34" viewBox="0 0 14 34" aria-hidden="true" className="flex-none">
        <line x1="7" y1="0" x2="7" y2="27" stroke="var(--color-accent)" strokeWidth="1.2" strokeDasharray="4 3" />
        <path d="M2 25 L7 33 L12 25 Z" fill="var(--color-accent)" />
      </svg>
      {label && <span>{label.toUpperCase()}</span>}
    </div>
  );

  const blocks: ReactNode[] = [];
  tiers.forEach((t, i) => {
    blocks.push(<div key={`t${i}`}>{tierEl(t)}</div>);
    if (i < tiers.length - 1) blocks.push(<div key={`a${i}`}>{arrow(t.link)}</div>);
  });

  // Wrap the framed range (e.g. the monorepo) in a dashed boundary.
  const out: ReactNode[] = [];
  if (frame) {
    const start = frame.from * 2;
    const end = frame.to * 2 + 1;
    out.push(...blocks.slice(0, start));
    out.push(
      <div key="frame" className="relative border-[1.5px] border-dashed border-ink/70 px-3 pt-6 pb-3 sm:px-5">
        <span className="absolute -top-2.5 left-4 bg-paper px-2 font-mono text-[11px] tracking-[0.16em]">{frame.label}</span>
        {blocks.slice(start, end)}
      </div>,
    );
    out.push(...blocks.slice(end));
  } else out.push(...blocks);

  return (
    <figure className="m-0 flex flex-col gap-4">
      <div className="flex flex-col">{out}</div>
      {notes?.map((n) => (
        <figcaption key={n} className="max-w-[760px] border-l-2 border-accent pl-3 font-mono text-[13px] leading-relaxed">
          NOTE — {n}
        </figcaption>
      ))}
    </figure>
  );
}

/** Numbered decision cards. */
export function DecisionCards({ items }: { items: { title: string; body: string }[] }) {
  return (
    <ol className="m-0 grid list-none grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-5 p-0">
      {items.map((d, i) => (
        <li key={d.title} className="relative flex flex-col gap-3 border-[1.5px] border-ink p-6 pt-7">
          <span className="absolute -top-3 left-5 flex h-6 min-w-6 items-center justify-center border-[1.5px] border-ink bg-paper px-1.5 font-mono text-xs">
            {String(i + 1).padStart(2, "0")}
          </span>
          <h3 className="m-0 text-[22px] leading-tight font-semibold uppercase">{d.title}</h3>
          <p className="m-0 text-[17px] leading-normal">{d.body}</p>
        </li>
      ))}
    </ol>
  );
}

export function NumberedList({ items }: { items: string[] }) {
  return (
    <ol className="m-0 flex max-w-[860px] list-none flex-col p-0 font-mono text-[15px]">
      {items.map((it, i) => (
        <li key={it} className="flex gap-5 border-t border-ink py-3.5 last:border-b">
          <span className="w-8 flex-none text-accent">{String(i + 1).padStart(2, "0")}</span>
          <span>{it}</span>
        </li>
      ))}
    </ol>
  );
}

export function StatsRow({ stats }: { stats: { value: string; label: string }[] }) {
  return (
    <dl className="m-0 grid grid-cols-2 border-[1.5px] border-ink sm:grid-cols-4">
      {stats.map((s, i) => (
        <div
          key={s.label}
          className={`flex flex-col-reverse gap-1 border-ink p-5 ${i % 2 === 0 ? "border-r-[1.5px]" : ""} ${
            i < 2 ? "border-b-[1.5px] sm:border-b-0" : ""
          } sm:border-r-[1.5px] sm:last:border-r-0`}
        >
          <dt className="font-mono text-xs tracking-[0.1em] text-ink-muted uppercase">{s.label}</dt>
          <dd className="m-0 text-[40px] leading-none font-bold">{s.value}</dd>
        </div>
      ))}
    </dl>
  );
}

export function StackTable({ stack }: { stack: { group: string; items: string[] }[] }) {
  return (
    <table className="w-full border-collapse font-mono text-sm">
      <tbody>
        {stack.map((s) => (
          <tr key={s.group} className="align-top">
            <th scope="row" className="w-40 border-[1.5px] border-ink px-3 py-3 text-left font-semibold uppercase sm:w-48">
              {s.group}
            </th>
            <td className="border-[1.5px] border-ink px-3 py-2.5">
              <ul className="m-0 flex list-none flex-wrap gap-2 p-0">
                {s.items.map((it) => (
                  <li key={it} className="border border-ink/70 px-2 py-0.5">
                    {it}
                  </li>
                ))}
              </ul>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
