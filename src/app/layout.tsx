import type { Metadata, Viewport } from "next";
import { plexCondensed, plexMono } from "./fonts";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://kaungsetzan.github.io"),
  title: {
    default: "Kaung Set Zan — Full-stack developer",
    template: "%s — Kaung Set Zan",
  },
  description:
    "Web development student in Berlin building full-stack apps with React, Next.js, React Native, Node.js and Spring Boot. Shipped 5A Goldsmith, a production app on the App Store and Google Play.",
};

export const viewport: Viewport = {
  themeColor: "#123766",
  colorScheme: "dark",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${plexCondensed.variable} ${plexMono.variable}`}>
      <body className="blueprint-grid">{children}</body>
    </html>
  );
}
