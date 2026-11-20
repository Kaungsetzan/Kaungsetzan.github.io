import { SectionHeader } from "@/components/blueprint/SectionHeader";
import { profile, revisions } from "@/data/profile";

export function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="flex scroll-mt-4 flex-col gap-7 px-5 pt-8 pb-14 sm:px-8">
      <SectionHeader id="about-title" label="FIG. 2 — REVISION HISTORY" title="From machines to the web" />
      <div className="flex flex-wrap gap-10">
        <p className="m-0 min-w-0 flex-[1_1_260px] text-xl leading-snug">
          Based in {profile.location.split(",")[0]}, originally from Myanmar. I moved from mechanical engineering into software,
          and now build and ship full-stack products end to end.
        </p>
        <ol className="m-0 flex min-w-0 flex-[2_1_480px] list-none flex-col p-0 font-mono text-[15px]">
          {revisions.map((r) => (
            <li key={r.rev} className="flex gap-6 border-t border-ink py-4 last:border-b">
              <span className="w-16 flex-none text-accent">REV {r.rev}</span>
              <span>{r.text}</span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
