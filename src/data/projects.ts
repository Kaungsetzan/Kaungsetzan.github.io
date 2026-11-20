/**
 * Project content. Add a project here and it gets a card on the home page and its
 * own drawing sheet at /projects/<slug>/ — no component changes needed.
 *
 * Rule for this file: only facts. Anything not confirmed yet is marked with
 * `placeholder: true` (or a TODO) and rendered as a visible placeholder.
 */

export interface Callout {
  label: string;
  value: string;
}

export interface Project {
  slug: string;
  partNo: string;
  /** shown after the part number, e.g. "MAIN ASSEMBLY" */
  assembly?: string;
  title: string;
  /** short line on the home page card */
  cardLine: string;
  /** one-liner at the top of the case study */
  oneLiner: string;
  tags: string[];
  /** facts on the tracing-paper overlay (hover) */
  callouts: Callout[];
  featured?: boolean;
  repo?: string;
  /** shown instead of a repo link for private client work */
  privateNote?: string;
  links?: { label: string; href: string }[];
}

export const projects: Project[] = [
  {
    slug: "5a-goldsmith",
    partNo: "01",
    assembly: "MAIN ASSEMBLY",
    title: "5A Goldsmith",
    featured: true,
    cardLine: "A B2B preorder platform built solo for a family jewellery business in Myanmar. Live on the App Store and Google Play.",
    oneLiner:
      "A production B2B preorder platform I built alone for a family jewellery business in Myanmar. It's live on the App Store and Google Play.",
    tags: ["React Native", "Expo", "React 19", "Supabase", "PostgreSQL", "Edge Functions"],
    callouts: [
      { label: "ROLE", value: "Solo developer & designer" },
      { label: "TIMELINE", value: "Under 2 months" },
      { label: "PLATFORMS", value: "iOS · Android · web admin" },
      { label: "SHIPPED", value: "2 apps · 3 edge functions · 17 migrations" },
      { label: "STATUS", value: "Live on App Store & Google Play" },
    ],
    privateNote: "Private client project",
    links: [
      { label: "App Store", href: "https://apps.apple.com/us/app/5a-goldsmith/id6763286941" },
      { label: "Google Play", href: "https://play.google.com/store/apps/details?id=com.goldsmith.preorder" },
    ],
  },
  {
    slug: "srh-ambassadors",
    partNo: "02",
    title: "SRH Ambassadors",
    cardLine: "Club management system for my university's student ambassadors, with voting, approvals and role-based access.",
    oneLiner:
      "A management system for my university's student ambassador club, with pages and actions limited by role.",
    tags: ["Next.js 15", "TypeScript", "Tailwind CSS", "Strapi 5"],
    callouts: [
      { label: "ROLES", value: "Student · Ambassador" },
      { label: "ACCESS", value: "Pages and actions limited by role" },
      { label: "FLOWS", value: "Vote and approve workflows" },
      { label: "AUTH", value: "JWT in httpOnly cookies" },
      { label: "STACK", value: "Next.js 15 · Strapi 5" },
    ],
    repo: "https://github.com/Kaungsetzan/srh-clubs",
  },
  {
    slug: "safehaven",
    partNo: "03",
    title: "SafeHaven",
    cardLine: "Full-stack admin panel for insurance products and their covers. A technical assessment, rated positively.",
    oneLiner:
      "A full-stack admin panel for insurance products and their covers. I built it as the technical assessment for Webellian, and it was rated positively.",
    tags: ["Java 21", "Spring Boot", "JPA", "React", "TypeScript"],
    callouts: [
      { label: "CONTEXT", value: "Technical assessment for Webellian" },
      { label: "RESULT", value: "Rated positively" },
      { label: "API", value: "Spring Boot, controller → service → repository" },
      { label: "FIXED", value: "An IDOR-style bug · an N+1 query" },
      { label: "UI", value: "React + TypeScript admin panel" },
    ],
    repo: "https://github.com/Kaungsetzan/safe-heaven",
  },
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
