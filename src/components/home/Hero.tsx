import { HeroMechanism } from "@/components/mechanism/HeroMechanism";
import { profile } from "@/data/profile";

export function Hero() {
  const cvHref = profile.cv ?? `mailto:${profile.email}?subject=${encodeURIComponent("CV request")}`;
  return (
    <section id="top" aria-labelledby="hero-title" className="flex flex-wrap items-center gap-8 px-5 pt-12 pb-8 sm:px-8 sm:pt-16">
      <div className="flex min-w-0 flex-[1_1_460px] flex-col gap-5">
        <p className="m-0 font-mono text-[13px] tracking-[0.14em] text-accent">FIG. 1 — GENERAL ARRANGEMENT</p>
        <h1 id="hero-title" className="m-0 text-[clamp(56px,9vw,84px)] leading-[0.95] font-bold tracking-[-0.01em] uppercase">
          Kaung
          <br />
          Set Zan
        </h1>
        <div className="flex max-w-[520px] items-center gap-2.5 font-mono text-xs tracking-[0.1em]" aria-hidden="true">
          <span>◄</span>
          <span className="h-px flex-1 bg-ink" />
          <span>FRONTEND ↔ BACKEND ↔ MOBILE</span>
          <span className="h-px flex-1 bg-ink" />
          <span>►</span>
        </div>
        <p className="sr-only">Full-stack developer: frontend, backend and mobile.</p>
        <p className="m-0 max-w-[540px] text-[clamp(19px,2.4vw,22px)] leading-[1.4]">{profile.pitch}</p>
        <p className="m-0 max-w-[540px] font-mono text-xs leading-relaxed tracking-[0.08em] text-ink-muted">
          <span className="text-accent">OPEN TO →</span> {profile.lookingFor.toUpperCase()}
        </p>
        <div className="mt-2 flex flex-wrap gap-3.5 font-mono text-sm tracking-[0.08em]">
          <a href="#work" className="bg-ink px-[22px] py-3.5 font-semibold text-paper no-underline hover:bg-accent">
            VIEW WORK →
          </a>
          <a href={cvHref} className="border-[1.5px] border-ink px-[22px] py-[13px] no-underline hover:border-accent hover:text-accent">
            {profile.cv ? "DOWNLOAD CV" : "REQUEST CV"}
          </a>
          <a href="#contact" className="border-[1.5px] border-ink px-[22px] py-[13px] no-underline hover:border-accent hover:text-accent">
            CONTACT
          </a>
        </div>
      </div>
      <div className="flex min-w-0 flex-[1_1_420px] justify-center">
        <HeroMechanism />
      </div>
    </section>
  );
}
