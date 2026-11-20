import type { Metadata, Viewport } from "next";
import { BlueprintBackground } from "@/components/blueprint/BlueprintBackground";
import { SiteFooter } from "@/components/blueprint/SiteFooter";
import { SiteHeader } from "@/components/blueprint/SiteHeader";
import { GearRail } from "@/components/rail/GearRail";
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
      <body>
        <a href="#main" className="sr-only z-50 bg-ink px-4 py-2 font-mono text-paper focus:not-sr-only focus:fixed focus:top-3 focus:left-3">
          Skip to content
        </a>
        <div className="relative min-h-screen overflow-hidden p-3 sm:p-6 min-[601px]:pr-[100px]">
          <BlueprintBackground />
          <div className="relative z-[1] mx-auto max-w-[1240px] border-[1.5px] border-ink outline outline-1 outline-offset-[6px] outline-[rgba(230,238,250,0.45)]">
            <SiteHeader />
            <main id="main">{children}</main>
            <SiteFooter />
          </div>
        </div>
        <GearRail />
      </body>
    </html>
  );
}
