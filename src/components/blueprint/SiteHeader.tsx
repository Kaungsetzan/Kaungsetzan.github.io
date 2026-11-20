import Link from "next/link";

const NAV = [
  { href: "/#work", label: "01 / WORK" },
  { href: "/#skills", label: "02 / SKILLS" },
  { href: "/#about", label: "03 / ABOUT" },
  { href: "/#contact", label: "04 / CONTACT" },
];

export function SiteHeader({ sheet = "DWG-001 · PORTFOLIO" }: { sheet?: string }) {
  return (
    <header className="flex flex-wrap items-center justify-between gap-4 border-b border-ink px-5 py-4 font-mono text-[13px] tracking-[0.08em] sm:px-8">
      <Link href="/" className="flex items-center gap-3 no-underline">
        <span className="border-[1.5px] border-ink px-2 py-1 font-semibold">KSZ</span>
        <span>{sheet}</span>
      </Link>
      <nav aria-label="Main" className="flex flex-wrap gap-x-7 gap-y-2">
        {NAV.map((n) => (
          <Link key={n.href} href={n.href} className="no-underline hover:text-accent">
            {n.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
