import { SectionHeader } from "@/components/blueprint/SectionHeader";
import { PhoneFrame } from "@/components/blueprint/DeviceFrame";
import { projects } from "@/data/projects";
import { ProjectCard } from "./ProjectCard";

const FEATURED_SHOTS = [
  { file: "home-catalog", alt: "5A Goldsmith app: product catalogue", h: 652 },
  { file: "product-detail", alt: "5A Goldsmith app: product detail", h: 649 },
  { file: "cart-pin-checkout", alt: "5A Goldsmith app: cart and PIN checkout", h: 649 },
];

export function SelectedWork() {
  const [featured, ...others] = projects;
  return (
    <section id="work" aria-labelledby="work-title" className="flex scroll-mt-4 flex-col gap-7 px-5 pt-16 pb-8 sm:px-8">
      <SectionHeader id="work-title" label="SECTION A–A" title="Selected work" />
      <div className="flex flex-wrap gap-6">
        <ProjectCard project={featured} className="flex-[2_1_560px]">
          <div className="grid max-w-[560px] grid-cols-3 gap-3 py-2 sm:gap-5">
            {FEATURED_SHOTS.map((s, i) => (
              <PhoneFrame
                key={s.file}
                src={`/projects/5a-goldsmith/${s.file}-sm.webp`}
                alt={s.alt}
                width={300}
                height={s.h}
                className={i === 1 ? "sm:-translate-y-3" : ""}
              />
            ))}
          </div>
        </ProjectCard>
        <div className="flex min-w-0 flex-[1_1_300px] flex-col gap-6">
          {others.map((p) => (
            <ProjectCard key={p.slug} project={p} className="flex-1" />
          ))}
        </div>
      </div>
    </section>
  );
}
