export const profile = {
  name: "Kaung Set Zan",
  nickname: "Liang",
  location: "Berlin, Germany",
  pitch:
    "Full-stack developer with a mechanical engineering background. I build web and mobile products from the database up — React, Next.js, Node.js, NestJS, PostgreSQL and Supabase.",
  lookingFor: "Internships and working-student (Werkstudent) roles in Germany · remote work for teams in Singapore or Australia",
  email: "kaungsetzan.work@gmail.com",
  linkedin: "https://www.linkedin.com/in/kaung-set-zan-61b911413/",
  github: "https://github.com/Kaungsetzan",
  /** TODO(Liang): add the CV PDF to public/cv/ and set its path here, e.g. "/cv/Kaung-Set-Zan-CV.pdf". */
  cv: null as string | null,
} as const;

/** "Revision history" in the About section, oldest first. */
export const revisions = [
  { rev: "A", text: "Mechanical engineering background" },
  { rev: "B", text: "Eight months of work experience in Singapore" },
  { rev: "C", text: "B.Sc. Web Development, SRH University of Applied Sciences Heidelberg, Campus Berlin (2024–2028)" },
  { rev: "D", text: "Shipped 5A Goldsmith solo — live on the App Store and Google Play" },
] as const;

/** Grouped skills, shown as a bill of materials. No bars or percentages. */
export const skills = [
  { group: "Frontend", items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Vite"] },
  { group: "Mobile", items: ["React Native", "Expo", "EAS Build"] },
  { group: "Backend", items: ["Node.js", "NestJS", "Java / Spring Boot", "Supabase", "Strapi", "REST APIs"] },
  { group: "Databases", items: ["PostgreSQL", "H2", "Apache Cassandra"] },
  { group: "DevOps & tools", items: ["Docker", "Git / GitHub"] },
] as const;
