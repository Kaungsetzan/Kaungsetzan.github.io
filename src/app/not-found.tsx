import Link from "next/link";

export default function NotFound() {
  return (
    <section className="flex flex-col gap-5 px-5 py-20 sm:px-8">
      <p className="m-0 font-mono text-xs tracking-[0.14em] text-accent">DWG KSZ-404 · SHEET MISSING</p>
      <h1 className="m-0 text-[clamp(44px,8vw,80px)] leading-[0.95] font-bold uppercase">Drawing not found</h1>
      <p className="m-0 max-w-xl text-xl leading-snug">This sheet isn&apos;t in the drawer. It may have been moved, or the link has a typo.</p>
      <Link href="/" className="self-start bg-ink px-5 py-3 font-mono text-sm font-semibold tracking-[0.08em] text-paper no-underline hover:bg-accent">
        ← BACK TO THE GENERAL ARRANGEMENT
      </Link>
    </section>
  );
}
