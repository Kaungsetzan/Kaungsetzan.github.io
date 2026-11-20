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
        <span className="border-[1.5px] border-ink px-2 py-1 font-semibold">KSZ</span>
        <span>{sheet}</span>
      </Link>
      <nav aria-label="Main" className="flex flex-wrap gap-2 sm:gap-3">
        {NAV.map((n) => (
          <Link
            key={n.href}
            href={n.href}
            className="nav-btn px-3 py-2 text-[13px] font-semibold tracking-[0.12em] no-underline sm:px-4 sm:text-[15px]"
          >
            {n.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
