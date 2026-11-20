import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CaseStudySheet } from "@/components/case-study/CaseStudySheet";
import { getProject, projects } from "@/data/projects";

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/projects/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return {
    title: `${project.title} — case study`,
    description: project.oneLiner,
    alternates: { canonical: `/projects/${project.slug}/` },
  };
}

export default async function ProjectPage({ params }: PageProps<"/projects/[slug]">) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();
  return <CaseStudySheet project={project} />;
}
