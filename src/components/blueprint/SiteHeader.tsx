import Link from "next/link";

const NAV = [
  { href: "/#work", label: "WORK" },
  { href: "/#skills", label: "SKILLS" },
  { href: "/#about", label: "ABOUT" },
  { href: "/#contact", label: "CONTACT" },
];

export function SiteHeader({ sheet = "DWG-001 · PORTFOLIO" }: { sheet?: string }) {
  return (
    <header className="flex flex-wrap items-center justify-between gap-4 border-b border-ink px-5 py-4 font-mono text-[13px] tracking-[0.08em] sm:px-8">
      <Link href="/" className="flex items-center gap-3 no-underline">
        <span className="font-semibold tracking-[0.14em] text-accent">KSZ</span>
        <span>{sheet}</span>
      </Link>
      <nav aria-label="Main" className="flex flex-wrap gap-x-6 gap-y-2 sm:gap-x-8">
        {NAV.map((n) => (
          <Link
            key={n.href}
            href={n.href}
            className="nav-btn py-1 text-[14px] font-semibold tracking-[0.12em] no-underline sm:text-[16px]"
          >
            {n.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
