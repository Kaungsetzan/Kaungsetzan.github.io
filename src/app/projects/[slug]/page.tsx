import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CaseStudySheet } from "@/components/case-study/CaseStudySheet";
import { getProject, projects } from "@/data/projects";

export const dynamicParams = false;

const OG_IMAGE = {
  url: "/opengraph-image.png",
  width: 1200,
  height: 630,
  alt: "Kaung Set Zan, full-stack developer in Berlin: a blueprint drawing of a gear mechanism next to the name.",
};

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/projects/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  const url = `/projects/${project.slug}/`;
  return {
    title: `${project.title} — case study`,
    description: project.oneLiner,
    alternates: { canonical: url },
    openGraph: { type: "article", siteName: "Kaung Set Zan", locale: "en_GB", url, title: `${project.title} — case study`, description: project.oneLiner, images: [OG_IMAGE] },
    twitter: { card: "summary_large_image", images: [OG_IMAGE] },
  };
}

export default async function ProjectPage({ params }: PageProps<"/projects/[slug]">) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();
  return <CaseStudySheet project={project} />;
}
