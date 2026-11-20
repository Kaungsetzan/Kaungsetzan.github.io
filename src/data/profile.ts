export const profile = {
  name: "Kaung Set Zan",
  nickname: "Liang",
  location: "Berlin, Germany",
  pitch:
    "Full-stack developer with a mechanical engineering background. I build web and mobile products from the database up — React, Next.js, Node.js, NestJS, PostgreSQL and Supabase.",
  lookingFor: "Internships and working-student (Werkstudent) roles in Germany",
  email: "kaungsetzan.work@gmail.com",
  linkedin: "https://www.linkedin.com/in/kaung-set-zan-61b911413/",
  github: "https://github.com/Kaungsetzan",
  /** TODO(Liang): add the CV PDF to public/cv/ and set its path here, e.g. "/cv/Kaung-Set-Zan-CV.pdf". */
  cv: null as string | null,
} as const;

/** "Revision history" in the About section, oldest first. */
export const revisions = [
  { rev: "A", when: "2016–2019", text: "Higher National Diploma in Mechanical Engineering", detail: "Victoria University College" },
  {
    rev: "B",
    when: "2022–2023",
    text: "Test engineer — SEGEN Construction Pte. Ltd., Singapore",
    detail: "Protocol compliance tests for 5G NR on a Nokia 5G project, and drive tests to measure network performance in the field.",
  },
  { rev: "C", when: "2024–2028", text: "B.Sc. Web Development", detail: "SRH University of Applied Sciences Heidelberg, Campus Berlin" },
  { rev: "D", when: "2025–2026", text: "Shipped 5A Goldsmith solo", detail: "Live on the App Store and Google Play" },
] as const;

export const languages = [
  { name: "English", level: "Upper intermediate" },
  { name: "German", level: "A2, currently learning" },
  { name: "Burmese", level: "Native" },
] as const;

/** Grouped skills, shown as a bill of materials. No bars or percentages. */
export const skills = [
  { group: "Frontend", items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Vite"] },
  { group: "Mobile", items: ["React Native", "Expo", "EAS Build"] },
  { group: "Backend", items: ["Node.js", "NestJS", "Java / Spring Boot", "Supabase", "Strapi", "REST APIs"] },
  { group: "Databases", items: ["PostgreSQL", "H2", "Apache Cassandra"] },
  { group: "DevOps & tools", items: ["Docker", "Git / GitHub"] },
] as const;
