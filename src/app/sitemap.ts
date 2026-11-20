import type { MetadataRoute } from "next";
import { projects } from "@/data/projects";

export const dynamic = "force-static";

const SITE = "https://kaungsetzan.github.io";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${SITE}/`, changeFrequency: "monthly", priority: 1 },
    ...projects.map((p) => ({
      url: `${SITE}/projects/${p.slug}/`,
      changeFrequency: "monthly" as const,
      priority: p.featured ? 0.9 : 0.7,
    })),
  ];
}
