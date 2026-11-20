// Temporary sheet while the real home page is being drawn (step 2 replaces this).
export default function Home() {
  return (
    <main className="mx-auto flex min-h-screen max-w-3xl flex-col justify-center gap-6 px-6 py-16">
      <p className="font-mono text-xs tracking-[0.14em] text-accent">DWG KSZ-000 · SHEET 1 OF 1 · REV 0</p>
      <h1 className="text-5xl font-bold uppercase leading-none sm:text-7xl">Kaung Set Zan</h1>
      <p className="max-w-xl text-xl leading-snug">
        Full-stack developer in Berlin. This drawing is still on the board — the full portfolio is being built right
        now.
      </p>
      <div className="flex flex-wrap gap-3 font-mono text-sm">
        <a className="border-[1.5px] border-ink px-3 py-2" href="https://kaungsetzan.github.io/5a-b2b-preorder-case-study/">
          5A GOLDSMITH CASE STUDY →
        </a>
        <a className="border-[1.5px] border-ink px-3 py-2" href="https://github.com/Kaungsetzan">
          GITHUB
        </a>
        <a className="border-[1.5px] border-ink px-3 py-2" href="https://www.linkedin.com/in/kaung-set-zan-61b911413/">
          LINKEDIN
        </a>
      </div>
    </main>
  );
}
