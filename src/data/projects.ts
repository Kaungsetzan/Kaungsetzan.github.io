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

export interface Shot {
  /** file name without extension in /public/projects/<slug>/ (expects <name>.webp and <name>-sm.webp) */
  file?: string;
  caption: string;
  alt?: string;
  width?: number;
  height?: number;
  /** not available yet: rendered as a marked placeholder frame */
  placeholder?: boolean;
}

export interface Gallery {
  heading: string;
  device: "phone" | "browser";
  shots: Shot[];
}

export interface ArchNode {
  title: string;
  lines: string[];
}

export interface ArchTier {
  label: string;
  nodes: ArchNode[];
  /** text on the arrow from this tier down to the next */
  link?: string;
}

export interface CaseStudy {
  period?: string;
  /** facts table at the top of the sheet */
  facts: Callout[];
  overview: { heading: string; paragraphs: string[] };
  context?: { heading: string; points: { title: string; body: string }[] };
  galleries?: Gallery[];
  architecture?: { heading: string; tiers: ArchTier[]; frame?: { label: string; from: number; to: number }; notes?: string[] };
  decisions: { heading: string; items: { title: string; body: string }[] };
  /** extra numbered lists, e.g. "Release and operations" or "Next steps" */
  lists?: { kind: string; heading: string; items: string[]; /** show right after the screenshots instead of after the decisions */ early?: boolean }[];
  results?: { value: string; label: string }[];
  stack: { group: string; items: string[] }[];
  /** sections still waiting for content: rendered as marked "to come" boxes */
  pending?: { at: "context" | "results"; heading: string; note: string }[];
  /** visible TODO note for the reader of the code and for Liang */
  todo?: string;
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
  caseStudy?: CaseStudy;
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
    caseStudy: {
      period: "2025–2026",
      facts: [
        { label: "CLIENT", value: "5A Goldsmith, a gold jewellery business in Myanmar" },
        { label: "ROLE", value: "Solo developer and designer" },
        { label: "TIMELINE", value: "Under 2 months (2025–2026)" },
        { label: "PLATFORMS", value: "iOS, Android, web admin" },
        { label: "PAYMENTS", value: "None in the app — orders are fulfilled and paid for offline" },
        { label: "SOURCE", value: "Private client project" },
      ],
      overview: {
        heading: "Full platform — designed, developed and shipped solo",
        paragraphs: [
          "5A Goldsmith is a gold jewellery business in Myanmar. It needed a way for its B2B customers — business owners and their staff — to browse products and place preorders remotely.",
          "I designed and built the whole system as one monorepo: the customer mobile app, the web admin dashboard and the Supabase backend, plus one shared package for the weight and fee calculations that both apps use.",
          "The admin dashboard includes a sales report, and the client can customise the app themselves.",
          "It started as B2B preorders. The client now also markets it to the general public: it still works as B2B inside, but public users can sign up.",
        ],
      },
      context: {
        heading: "Built for local constraints",
        points: [
          { title: "Unreliable internet", body: "Internet connections in Myanmar are unreliable, so every flow has to survive a weak signal." },
          { title: "New to ordering online", body: "Customers aren't used to ordering online, so the app has to be simple and forgiving." },
          { title: "Tight control", body: "The business needed tight control over its stock and its communication with customers." },
          { title: "No payments in the app", body: "Orders are fulfilled and paid for offline. The app focuses on browsing, preordering and talking to the business." },
        ],
      },
      galleries: [
        {
          heading: "Mobile app — iOS and Android, React Native and Expo",
          device: "phone",
          shots: [
            { file: "login", caption: "Login", width: 720, height: 1558 },
            { file: "home-catalog", caption: "Home · catalogue", width: 720, height: 1565 },
            { file: "product-detail", caption: "Product detail", width: 720, height: 1558 },
            { file: "cart-pin-checkout", caption: "Cart · PIN checkout", width: 720, height: 1558 },
            { file: "orders", caption: "Orders", width: 720, height: 1558 },
            { file: "order-detail", caption: "Order detail", width: 720, height: 1558 },
          ],
        },
        {
          heading: "Admin dashboard — React 19, React Router 7, on Vercel",
          device: "browser",
          shots: [
            { file: "dashboard-overview", caption: "Dashboard overview", width: 1600, height: 928 },
            { file: "order-management", caption: "Order management", width: 1600, height: 926 },
            { file: "customer-messaging", caption: "Customer messaging", width: 1600, height: 927 },
            { file: "customer-management", caption: "Customer management", width: 1600, height: 924 },
            { file: "product-catalogue", caption: "Product catalogue", width: 1600, height: 926 },
            { file: "home-screen-highlights", caption: "Home-screen highlights", width: 1600, height: 926 },
            { file: "favourites-analytics", caption: "Favourites analytics", width: 1600, height: 927 },
            { caption: "Sales report", placeholder: true },
          ],
        },
      ],
      architecture: {
        heading: "One monorepo, two apps, one backend",
        frame: { label: "MONOREPO", from: 0, to: 2 },
        tiers: [
          {
            label: "APPS",
            nodes: [
              { title: "Customer app", lines: ["iOS · Android", "React Native · Expo SDK 54", "React Query"] },
              { title: "Admin dashboard", lines: ["Web", "React 19 · React Router 7 · Vite", "Hosted on Vercel"] },
            ],
            link: "both import",
          },
          {
            label: "SHARED PACKAGE",
            nodes: [{ title: "Weight and fee maths", lines: ["Integer kyat · pe · yway", "Defined once, used by both apps"] }],
            link: "apps talk to Supabase over HTTPS and Realtime",
          },
          {
            label: "BACKEND — SUPABASE",
            nodes: [
              { title: "PostgreSQL", lines: ["Row Level Security", "17 migrations"] },
              { title: "Auth · Storage · Realtime", lines: ["Customers: Supabase Auth", "Chat over Realtime"] },
              { title: "Edge Functions × 3", lines: ["Deno", "Checkout handled on the server"] },
            ],
            link: "notifications · errors · builds",
          },
          {
            label: "SERVICES",
            nodes: [
              { title: "Expo Notifications", lines: ["APNs (iOS) · FCM (Android)"] },
              { title: "Sentry", lines: ["Error tracking"] },
              { title: "EAS Build", lines: ["TestFlight · App Store · Google Play"] },
            ],
          },
        ],
        notes: ["Admins sign in separately: bcrypt-hashed passwords in their own table, signed HMAC token valid for 14 days."],
      },
      decisions: {
        heading: "Solving real problems, not just technical ones",
        items: [
          {
            title: "PIN checkout instead of OTP",
            body: "SMS or email codes don't work well on poor connections, so customers confirm an order with a shared PIN instead. It solved the connectivity problem and cut down accidental orders by staff, which the client specifically needed. If an order is still wrong, customers can fix it through the in-app chat.",
          },
          {
            title: "Two separate login systems",
            body: "Customers sign in with Supabase Auth using generated (synthetic) email addresses. Admins sign in with bcrypt-hashed passwords stored in a separate table and get a signed HMAC token that's valid for 14 days — no Supabase Auth involved. Admin access stays fully isolated from customer accounts.",
          },
          {
            title: "Real-time chat",
            body: "Customers can message the business from the app. Messages go through Supabase Realtime, with reconnect backoff for poor networks. All admin replies come from one shared sender, so individual staff stay anonymous.",
          },
          {
            title: "Push notifications",
            body: "Customers get a push notification through Expo Notifications when an admin replies or an order's status changes, so they never have to check the app manually. Each customer can switch chat and order notifications on or off separately.",
          },
          {
            title: "Integer maths for gold weights",
            body: "Gold in Myanmar is weighed in kyat, pe and yway. Floating-point maths causes rounding errors that compound in prices, so all weight and fee calculations use whole numbers — in one shared package, defined once and used by both apps.",
          },
        ],
      },
      lists: [
        {
          kind: "PROCESS",
          heading: "Release and operations",
          items: [
            "EAS Build for iOS and Android, with separate preview, staging (TestFlight) and production builds",
            "Android app signing and Apple push notification (APNs) setup",
            "Firebase Cloud Messaging for Android push notifications",
            "Error tracking with Sentry",
            "Admin dashboard deployed on Vercel",
          ],
        },
      ],
      results: [
        { value: "2", label: "Apps shipped" },
        { value: "3", label: "Edge Functions" },
        { value: "17", label: "DB migrations" },
        { value: "<2 mo", label: "Delivered solo" },
      ],
      stack: [
        { group: "Mobile", items: ["React Native", "Expo SDK 54", "TypeScript", "React Query", "Expo Notifications", "EAS Build", "Sentry"] },
        { group: "Admin web", items: ["React 19", "React Router 7", "TypeScript", "Tailwind CSS 4", "Vite", "Vercel"] },
        { group: "Backend", items: ["Supabase", "PostgreSQL", "Deno Edge Functions", "Supabase Auth", "Supabase Storage", "Supabase Realtime"] },
        { group: "Security", items: ["bcrypt (admin auth)", "HMAC tokens", "Row Level Security", "Rate limiting", "Server-side checkout"] },
      ],
      todo: "Sales report screenshot still to come.",
    },
  },
  {
    slug: "srh-ambassadors",
    partNo: "02",
    title: "SRH Ambassadors",
    cardLine: "Club management system for my university's student ambassadors, with voting, approvals and role-based access.",
    oneLiner:
      "A management system for my university's student ambassador club, with pages and actions limited by role.",
    tags: ["Next.js 16", "TypeScript", "Tailwind CSS", "Strapi 5"],
    callouts: [
      { label: "ROLES", value: "Student · Ambassador" },
      { label: "ACCESS", value: "Pages and actions limited by role" },
      { label: "FLOWS", value: "Propose → vote → approve" },
      { label: "AUTH", value: "JWT in httpOnly cookies" },
      { label: "STACK", value: "Next.js 16 · Strapi 5" },
    ],
    repo: "https://github.com/Kaungsetzan/srh-clubs",
    caseStudy: {
      facts: [
        { label: "WHAT", value: "Web app for a university's student ambassador club" },
        { label: "ROLES", value: "Student · Ambassador" },
        { label: "MY ROLE", value: "[ to be confirmed ]" },
        { label: "TIMELINE", value: "[ to be confirmed ]" },
        { label: "SOURCE", value: "Public repository on GitHub" },
      ],
      overview: {
        heading: "Students propose clubs, ambassadors decide",
        paragraphs: [
          "A university web app where students propose and vote on clubs, and SRH ambassadors approve them. It also shows university events, news and projects.",
          "It's two separate apps: a Next.js frontend and a Strapi 5 headless CMS as the backend. The frontend talks to Strapi through its REST API.",
        ],
      },
      galleries: [
        {
          heading: "Screens",
          device: "browser",
          shots: [
            { caption: "Clubs list", placeholder: true },
            { caption: "Club detail with votes", placeholder: true },
          ],
        },
      ],
      architecture: {
        heading: "Next.js frontend, Strapi backend",
        tiers: [
          { label: "BROWSER", nodes: [{ title: "Students and ambassadors", lines: ["Pages and buttons shown by role"] }], link: "pages and Server Actions" },
          {
            label: "FRONTEND",
            nodes: [
              { title: "Next.js 16 · App Router", lines: ["TypeScript · Tailwind CSS", "Server Actions for login and mutations", "Proxy redirects guests from protected pages"] },
            ],
            link: "REST with the user's JWT (Bearer)",
          },
          {
            label: "BACKEND",
            nodes: [
              { title: "Strapi 5", lines: ["Clubs · votes · events · news · projects", "Custom vote, approve, reject routes"] },
              { title: "Users & permissions", lines: ["Roles: Student, Ambassador"] },
            ],
            link: "",
          },
          { label: "DATABASE", nodes: [{ title: "SQLite", lines: ["Development database"] }] },
        ],
      },
      lists: [
        {
          kind: "PROCESS",
          heading: "Club lifecycle",
          early: true,
          items: [
            "A logged-in student proposes a club (name, description, contact email, member limit)",
            "Other students vote — one vote per student per club",
            "At 10 votes the club becomes eligible",
            "An ambassador approves it, or rejects it with a reason",
          ],
        },
      ],
      decisions: {
        heading: "Rules live on the server",
        items: [
          {
            title: "JWT in an httpOnly cookie",
            body: "Login runs through Next.js Server Actions, which store the JWT in an httpOnly, SameSite=Lax cookie (Secure in production, one week). The token never sits in localStorage or reaches client-side JavaScript.",
          },
          {
            title: "Roles checked by the API, not just the UI",
            body: "The UI only shows approve and reject buttons to ambassadors, but Strapi checks the role again on every approve or reject request and answers 403 to anyone else.",
          },
          {
            title: "Vote rules enforced in the backend",
            body: "Each student can vote once per club, and the API refuses to approve a club below the 10-vote threshold — whatever the frontend sends.",
          },
          {
            title: "Final, explained decisions",
            body: "A rejection needs a reason, and a club that has been approved or rejected can't be decided again.",
          },
        ],
      },
      stack: [
        { group: "Frontend", items: ["Next.js 16 (App Router)", "React 19", "TypeScript", "Tailwind CSS", "Server Actions"] },
        { group: "Backend", items: ["Strapi 5", "Node.js", "REST API", "SQLite (dev)"] },
        { group: "Auth", items: ["JWT", "httpOnly cookies", "Role-based access"] },
      ],
      pending: [
        { at: "context", heading: "Problem and context", note: "What the club needed before this app, and who uses it" },
        { at: "results", heading: "Results", note: "Usage, feedback or what changed for the club" },
      ],
      todo: "My role, timeline, problem/context, results and screenshots still to come.",
    },
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
    caseStudy: {
      facts: [
        { label: "CONTEXT", value: "Technical assessment for a full-stack internship at Webellian" },
        { label: "RESULT", value: "Rated positively" },
        { label: "ROLE", value: "Solo — backend and frontend" },
        { label: "STACK", value: "Java 21 · Spring Boot 4.1 · React 19" },
        { label: "SOURCE", value: "Public repository on GitHub" },
      ],
      overview: {
        heading: "An admin panel for insurance products and their covers",
        paragraphs: [
          "SafeHaven is an insurance product management app: a Spring Boot REST API backed by an H2 database, with a React and TypeScript frontend for browsing and managing insurance products and the covers inside them.",
          "I built it as the technical assessment for a full-stack internship at Webellian, as two separate projects — backend first, then frontend. It was rated positively.",
          "The API has full CRUD for products and their nested covers, input validation with clear error responses, and 45 automated tests across controllers, services and integration.",
        ],
      },
      galleries: [
        {
          heading: "Admin panel — React, TypeScript and Bootstrap",
          device: "browser",
          shots: [
            { file: "product-list", caption: "Products", width: 1600, height: 1000 },
            { file: "product-detail", caption: "Product detail with its covers", width: 1600, height: 1000 },
            { file: "edit-product-modal", caption: "Edit product — modal keeps covers in view", width: 1600, height: 1000 },
            { file: "add-cover-modal", caption: "Add a cover", width: 1600, height: 1000 },
            { file: "create-product", caption: "New product — same form as edit", width: 1600, height: 1000 },
          ],
        },
      ],
      architecture: {
        heading: "Three layers behind a REST API",
        frame: { label: "SPRING BOOT API", from: 1, to: 3 },
        tiers: [
          {
            label: "FRONTEND",
            nodes: [{ title: "React admin panel", lines: ["React 19 · TypeScript · React Router 7", "axios · Bootstrap 5 · Vite"] }],
            link: "REST · /api/products/{id}/covers/{coverId}",
          },
          {
            label: "CONTROLLER",
            nodes: [{ title: "InsuranceProduct · Cover controllers", lines: ["Bean Validation → 400 with field errors", "Not found → 404"] }],
            link: "",
          },
          {
            label: "SERVICE",
            nodes: [{ title: "Service interfaces + implementations", lines: ["Business rules, e.g. a cover must belong to its product"] }],
            link: "",
          },
          {
            label: "REPOSITORY",
            nodes: [{ title: "Spring Data JPA", lines: ["@EntityGraph fetches products with their covers"] }],
            link: "",
          },
          { label: "DATABASE", nodes: [{ title: "H2 in-memory", lines: ["Seeded with sample products and covers"] }] },
        ],
      },
      decisions: {
        heading: "Found, fixed and designed",
        items: [
          {
            title: "Fixed an IDOR-style bug",
            body: "Editing or deleting a cover didn't check that the cover belonged to the product in the URL, so a request through one product could change another product's cover. Now the service verifies ownership first and answers 404 if it doesn't match.",
          },
          {
            title: "Fixed an N+1 query",
            body: "The product list loaded each product's covers with a separate query. An @EntityGraph on the repository now fetches products and their covers together.",
          },
          {
            title: "Nested REST resources",
            body: "Covers live under their product — /api/products/{id}/covers/{coverId} — so the URLs mirror the data model.",
          },
          {
            title: "Types as Java enums",
            body: "Product and cover types are real Java enums rather than free strings, so invalid values can't reach the database.",
          },
          {
            title: "Edit in a modal, one shared form",
            body: "Product edits open in a modal on the detail page so the covers stay visible while you edit. Create and edit share one form component.",
          },
        ],
      },
      lists: [
        {
          kind: "REV",
          heading: "Future improvements",
          items: [
            "Per-customer pricing through a separate rating layer (location, risk profile) instead of one fixed base premium per product",
            "Move product and cover types from enums into their own tables",
          ],
        },
      ],
      results: [
        { value: "9", label: "REST endpoints" },
        { value: "45", label: "Automated tests" },
        { value: "3", label: "Backend layers" },
        { value: "2", label: "Bugs found & fixed" },
      ],
      stack: [
        { group: "Backend", items: ["Java 21", "Spring Boot 4.1", "Spring Data JPA", "Bean Validation", "H2", "Lombok"] },
        { group: "Frontend", items: ["React 19", "TypeScript", "React Router 7", "axios", "Bootstrap 5", "Vite"] },
        { group: "Testing", items: ["JUnit", "Controller tests", "Service tests", "Integration tests"] },
      ],
    },
  },
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
