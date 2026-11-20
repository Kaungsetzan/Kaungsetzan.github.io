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

## Develop

```bash
npm install
npm run dev      # http://localhost:3000
npm run lint
npm run build    # static site in ./out
```
