import { profile } from "@/data/profile";

const LINKS = [
  { label: "EMAIL", value: profile.email, href: `mailto:${profile.email}`, mark: "→", external: false },
  { label: "LINKEDIN", value: "in/kaung-set-zan", href: profile.linkedin, mark: "↗", external: true },
  { label: "GITHUB", value: "github.com/Kaungsetzan", href: profile.github, mark: "↗", external: true },
  ...(profile.cv ? [{ label: "CV", value: "Download PDF", href: profile.cv, mark: "↓", external: true }] : []),
];

/** Contact: a heading on the left, one large row per way to reach me on the right. */
export function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer id="contact" className="flex flex-col gap-8 border-t-[1.5px] border-ink px-5 pt-10 pb-6 sm:px-8">
      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,560px)] lg:items-end">
        <div className="flex flex-col gap-3">
          <h2 className="m-0 text-[clamp(32px,5vw,44px)] leading-none font-semibold uppercase">Let&apos;s build something</h2>
        </div>
        <ul className="m-0 flex list-none flex-col p-0">
          {LINKS.map((l) => (
            <li key={l.label}>
              <a
                href={l.href}
                {...(l.external ? { target: "_blank", rel: "noopener" } : {})}
                className="contact-row grid grid-cols-[64px_minmax(0,1fr)_auto] items-center gap-3 sm:grid-cols-[88px_minmax(0,1fr)_auto] sm:gap-4 border-t border-ink py-4 no-underline"
              >
                <span className="font-mono text-[11px] tracking-[0.14em] text-accent">{l.label}</span>
                <span className="text-[clamp(17px,2.2vw,21px)] [overflow-wrap:anywhere]">{l.value}</span>
                <span className="contact-mark font-mono text-lg" aria-hidden="true">
                  {l.mark}
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
      <p className="m-0 flex flex-wrap justify-between gap-2 border-t border-ink/40 pt-4 font-mono text-[11px] tracking-[0.12em] text-ink-muted">
        <span>© {year} KAUNG SET ZAN</span>
        <span>BERLIN, GERMANY</span>
      </p>
    </footer>
  );
}
