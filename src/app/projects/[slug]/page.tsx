import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProject, projects } from "@/data/projects";

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/projects/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  return project ? { title: project.title, description: project.oneLiner } : {};
}

// Temporary drawing sheet; the full case-study template replaces this in the next step.
export default async function ProjectPage({ params }: PageProps<"/projects/[slug]">) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  return (
    <article className="drawing-sheet flex flex-col gap-5 px-5 py-14 sm:px-8">
      <p className="m-0 font-mono text-xs tracking-[0.14em] text-accent">
        DWG KSZ-0{project.partNo}-A · PART NO. {project.partNo}
        {project.assembly ? ` · ${project.assembly}` : ""}
      </p>
      <h1 className="m-0 text-[clamp(40px,7vw,64px)] leading-none font-bold uppercase">{project.title}</h1>
      <p className="m-0 max-w-2xl text-xl leading-snug">{project.oneLiner}</p>
      <p className="m-0 font-mono text-sm text-ink-muted">[ FULL CASE STUDY — DRAWING IN PROGRESS ]</p>
      <Link href="/#work" className="self-start border-[1.5px] border-ink px-3 py-2 font-mono text-sm no-underline hover:text-accent">
        ← BACK TO DRAWER
      </Link>
    </article>
  );
}
