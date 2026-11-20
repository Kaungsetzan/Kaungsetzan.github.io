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
        <ProjectCard
          project={featured}
          className="flex-[2_1_560px]"
          figure={
            /* top half of three app screens, cut off by a fade like a broken-out view */
            <div className="card-figure grid min-h-[clamp(150px,34vw,230px)] max-w-[640px] flex-[1_1_0px] grid-cols-3 grid-rows-[minmax(0,1fr)] gap-3 sm:gap-5">
              {FEATURED_SHOTS.map((s, i) => (
                <div key={s.file} className={`overflow-hidden ${i === 1 ? "" : "pt-3 sm:pt-4"}`}>
                  <PhoneFrame src={`/projects/5a-goldsmith/${s.file}-sm.webp`} alt={s.alt} width={300} height={s.h} />
                </div>
              ))}
            </div>
          }
        />
        <div className="flex min-w-0 flex-[1_1_300px] flex-col gap-6">
          {others.map((p) => (
            <ProjectCard key={p.slug} project={p} className="flex-1" />
          ))}
        </div>
      </div>
    </section>
  );
}
