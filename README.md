# kaungsetzan.github.io

Portfolio of **Kaung Set Zan** — full-stack developer in Berlin.
Live at **https://kaungsetzan.github.io**.

Built as a blueprint: an interactive mechanism in the hero, a gear-and-rack scroll rail, and
case studies laid out like engineering drawings.

## Stack

- Next.js (App Router) with `output: "export"` — a fully static site, no server
- TypeScript, Tailwind CSS
- IBM Plex Sans Condensed + IBM Plex Mono, bundled locally (SIL Open Font License)
- Deployed to GitHub Pages by `.github/workflows/deploy.yml` on every push to `main`

## Structure

```
src/
  app/                    routes, metadata, sitemap, robots, fonts, preview image
  data/projects.ts        all project + case-study content (typed)
  data/profile.ts         name, links, skills, revision history
  lib/gears.ts            gear and rack outlines (tooth geometry)
  lib/mechanism.ts        hero mechanism geometry: gear timing, crank, cam, ratchet pawl
  components/mechanism/   the interactive hero drawing
  components/rail/        desktop scroll rail (rack-and-roller scrollbar + lever)
  components/home/        hero, project cards (tracing overlay, drawer pull), skills, about
  components/case-study/  one template that renders every /projects/<slug>/ page
```

Adding a project = adding an entry to `src/data/projects.ts` (+ screenshots in
`public/projects/<slug>/` as `<name>.webp` and `<name>-sm.webp`).

## Develop

```bash
npm install
npm run dev      # http://localhost:3000
npm run lint
npm run build    # static site in ./out
```
