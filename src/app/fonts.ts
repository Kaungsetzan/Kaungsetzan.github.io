import localFont from "next/font/local";

// IBM Plex is bundled with the site (SIL Open Font License, see fonts/OFL-LICENSE.txt)
// instead of loading from Google Fonts, so visitors' browsers never contact Google.
export const plexCondensed = localFont({
  src: [
    { path: "./fonts/ibm-plex-sans-condensed-latin-400-normal.woff2", weight: "400", style: "normal" },
    { path: "./fonts/ibm-plex-sans-condensed-latin-600-normal.woff2", weight: "600", style: "normal" },
    { path: "./fonts/ibm-plex-sans-condensed-latin-700-normal.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-plex-condensed",
  display: "swap",
  fallback: ["Arial Narrow", "Arial", "sans-serif"],
});

export const plexMono = localFont({
  src: [
    { path: "./fonts/ibm-plex-mono-latin-400-normal.woff2", weight: "400", style: "normal" },
    { path: "./fonts/ibm-plex-mono-latin-600-normal.woff2", weight: "600", style: "normal" },
  ],
  variable: "--font-plex-mono",
  display: "swap",
  // Labels only: let the main text font win the race on slow connections.
  preload: false,
  fallback: ["ui-monospace", "Menlo", "Consolas", "monospace"],
});
