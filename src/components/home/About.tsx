import { DrawnCallouts } from "@/components/blueprint/DrawnCallouts";
import { SectionHeader } from "@/components/blueprint/SectionHeader";
import { languages, profile, revisions } from "@/data/profile";

export function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="flex scroll-mt-4 flex-col gap-7 px-5 pt-8 pb-14 sm:px-8">
      <SectionHeader id="about-title" title="From machines to the web" />
      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(340px,520px)] lg:gap-10">
        <div className="flex flex-col gap-6">
          <p className="m-0 max-w-[620px] text-xl leading-snug">
            Based in {profile.location.split(",")[0]}, originally from Myanmar. I moved from mechanical engineering and 5G network
            testing into software, and now build and ship full-stack products end to end.
          </p>
          <dl className="m-0 flex flex-col gap-2 font-mono text-[13px] tracking-[0.06em]">
            <dt className="text-[11px] tracking-[0.14em] text-accent">LANGUAGES</dt>
            {languages.map((l) => (
              <dd key={l.name} className="m-0">
                {l.name.toUpperCase()} <span className="text-ink-muted">— {l.level}</span>
              </dd>
            ))}
          </dl>
        </div>
        <DrawnCallouts
          items={revisions.map((r) => ({ marker: r.rev, label: `REV ${r.rev} · ${r.when}`, value: r.text, detail: r.detail }))}
        />
      </div>
    </section>
  );
}
