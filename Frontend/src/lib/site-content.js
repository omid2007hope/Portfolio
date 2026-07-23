const DEFAULT_PROFILE_NAME = "Omid Teimory";
const DEFAULT_HERO_DESCRIPTION =
  "I build fast, modern web applications that help businesses grow.";
const DEFAULT_PRIMARY_STACK = "React, Next.js, Tailwind CSS, Node.js, MongoDB";

const DEFAULT_SOCIAL_LINKS = [
  {
    name: "GitHub",
    iconKey: "github",
    url: "https://github.com/omid2007hope",
  },
  {
    name: "LinkedIn",
    iconKey: "linkedin",
    url: "https://www.linkedin.com/in/omid-teimory-48233638b/",
  },
  {
    name: "X",
    iconKey: "x",
    url: "https://x.com/Omid2007hope",
  },
  {
    name: "Credly",
    iconKey: "",
    url: "https://www.credly.com/users/omid-teimory",
  },
  {
    name: "Artstation",
    iconKey: "",
    url: "https://www.artstation.com/omid2007hope",
  },
  {
    name: "Wakatime",
    iconKey: "",
    url: "https://wakatime.com/@17b65dc4-7043-4e9d-9f96-6b98d65254a2",
  },
];

const DEFAULT_NAVIGATION_LINKS = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Projects", to: "/projects" },
  { label: "Public Chat", to: "/public-chat" },
  { label: "Contact", to: "/contact" },
];

const ensureRequiredNavLinks = (items = []) => {
  const required = [
    { label: "Resume", to: "/resume" },
    { label: "Public Chat", to: "/public-chat" },
  ];

  const result = [...items];

  required.forEach((entry) => {
    if (!result.some((item) => item.to === entry.to)) {
      const contactIndex = result.findIndex((item) => item.to === "/contact");

      if (contactIndex >= 0) {
        result.splice(contactIndex, 0, entry);
      } else {
        result.push(entry);
      }
    }
  });

  return result;
};

export const ensureResumeLink = (items = []) =>
  ensureRequiredNavLinks(items).filter((item) => item.to === "/resume").length
    ? ensureRequiredNavLinks(items)
    : [...ensureRequiredNavLinks(items), { label: "Resume", to: "/resume" }];

const DEFAULT_ABOUT_PARAGRAPHS = [
  {
    content:
      "Omid Teimory is a Full-Stack Developer based in Vienna, Austria, focused on building complete web applications from idea to production. Every project starts with a clear frontend — one that communicates what the product does before a user has to think about it. Structure, typography, and interaction are not decoration; they are the first layer of a working product.",
  },
  {
    content:
      "When a project needs more than a polished interface, Omid Teimory connects the frontend to APIs, authentication systems, databases, and data flows without making the experience feel technical or heavy. The backend exists to support the user experience, not to impose its own complexity on it. Node.js and MongoDB handle the data layer; React and Next.js handle the interface — and both sides are built to stay predictable over time.",
  },
  {
    content:
      "Working as a Full-Stack Developer in Austria means taking responsibility for the complete product: from the first pixel to the deployed system running in production. That includes performance budgets, asset optimization, caching strategy, and the kind of component architecture that does not require a rewrite six months later. Fast pages, clean structure, and maintainable code are the baseline expectation on every project Omid Teimory works on.",
  },
  {
    content:
      "The technology choices are intentional. React and Next.js are used because they produce fast, indexable pages with a predictable component model. Tailwind CSS keeps styling co-located and consistent. Node.js is used for the API layer because it shares the same language as the frontend, reducing context-switching and making data contracts easier to reason about. MongoDB provides the flexibility needed for content-heavy or rapidly iterating products.",
  },
  {
    content:
      "Beyond the technical stack, the work is shaped by a practical belief: the best software is the smallest correct version of the experience, delivered reliably. Omid Teimory approaches every project with that constraint in mind — building the feature that solves the real problem first, then expanding from a stable foundation rather than planning for every possible future use case from day one.",
  },
];

const DEFAULT_HOME_INFO_CARDS = [
  {
    title: "Frontend first",
    text: "I start with the interface, because clear layout and content make the rest easier.",
  },
  {
    title: "Backend aware",
    text: "I connect the frontend to the systems behind it without turning the experience into an afterthought.",
  },
  {
    title: "Performance minded",
    text: "Fast pages, careful asset use, and lightweight interactions matter as much as visual polish.",
  },
  {
    title: "Maintainable",
    text: "Structure should stay understandable months later, so future changes do not require a rewrite.",
  },
];

export const getNavigationLinks = (profile) =>
  ensureRequiredNavLinks(
    profile?.navigationLinks?.length
      ? profile.navigationLinks
      : DEFAULT_NAVIGATION_LINKS,
  );

export const getSocialLinks = (profile) =>
  profile?.socialLinks?.length ? profile.socialLinks : DEFAULT_SOCIAL_LINKS;

export const getHeroSkills = (profile) =>
  profile?.heroSkills?.length
    ? profile.heroSkills
    : [
        "HTML",
        "CSS",
        "Tailwind CSS",
        "JavaScript",
        "React",
        "Next.js",
        "Node.js",
        "MongoDB",
      ];

export const getHeroDescription = (profile) =>
  profile?.longBio?.trim() ||
  (profile?.shortBio?.trim().length >= 130 ? profile.shortBio.trim() : "") ||
  DEFAULT_HERO_DESCRIPTION;

export const getHeaderBannerText = (profile) =>
  profile?.headerBannerText || "Available for full-time roles immediately";

export const getHeaderAvailabilityText = (profile) =>
  profile?.headerAvailabilityText ||
  profile?.availabilityText ||
  "Available for full-time roles immediately";

export const getHeaderContactCtaLabel = (profile) =>
  profile?.headerContactCtaLabel || "Hire Me";

export const getSignUpCtaLabel = (profile) =>
  profile?.headerSignUpCtaLabel || "Sign Up";

export const getHomeEyebrow = (profile) =>
  profile?.homeEyebrow || getJobTitle(profile);

export const getHomeTitle = (profile) =>
  profile?.homeTitle || DEFAULT_HERO_DESCRIPTION;

export const getHomeDescription = (profile) =>
  profile?.homeDescription || getJobTitle(profile);

export const getHomeAvailabilityNote = (profile) =>
  profile?.homeAvailabilityNote ||
  `${profile?.location || "Based in Austria"} - ${profile?.availabilityText || "Available for full-time roles immediately"}`;

export const getHomeSupportText = (profile) =>
  profile?.homeSupportText ||
  "Open to freelance & contract work in the coming months";

export const getHomeFeaturedTitle = (profile) =>
  profile?.homeFeaturedTitle ||
  profile?.currentFocus ||
  "Building production-ready web apps with clear UI and reliable backend support";

export const getHomeFeaturedDescription = (profile) =>
  profile?.homeFeaturedDescription ||
  profile?.heroBadge ||
  "Currently building";

export const getHomeStrengthsTitle = (profile) =>
  profile?.homeStrengthsTitle || "Core strengths";

export const getHomeStrengthsText = (profile) =>
  profile?.homeStrengthsText ||
  profile?.primaryStack ||
  `${DEFAULT_PRIMARY_STACK} — the Full-Stack toolkit ${getDisplayName(profile)} uses to ship production-ready web applications in Vienna, Austria and beyond.`;

export const getHomeNextStepTitle = (profile) =>
  profile?.homeNextStepTitle || "Next step";

export const getHomeNextStepText = (profile) =>
  profile?.homeNextStepText ||
  `${getDisplayName(profile)} builds with frontend quality first — clear layout, fast load time, and accessible interaction — then supports it with backend structure, APIs, and data flows that keep the product reliable and maintainable long after the initial launch.`;

export const getHomeSectionEyebrow = (profile) =>
  profile?.homeSectionEyebrow || "What I Do";

export const getHomeSectionTitle = (profile) =>
  profile?.homeSectionTitle ||
  "I build complete web applications from frontend to backend.";

export const getHomeSectionDescription = (profile) =>
  profile?.homeSectionDescription ||
  `${getDisplayName(profile)} is a Full-Stack Developer based in Vienna, Austria, focused on speed, clarity, and real-world usability. Every application is built to feel polished for end users and easy to maintain for the engineering team — whether that team is one person or ten. The stack is chosen to match the problem: React and Next.js for fast, indexable frontends; Node.js and MongoDB for reliable, flexible backend systems.`;

export const getHomeSectionItems = (profile) =>
  profile?.homeSectionItems?.length
    ? profile.homeSectionItems
    : [
        "Modern frontend development with React and Next.js — fast, accessible, and production-ready",
        "Backend APIs and authentication systems with Node.js and MongoDB",
        "Full-Stack architecture: from database schema to deployed UI, built to stay maintainable",
        "Performance-first development: optimized assets, lightweight interactions, and minimal render-blocking",
        "Based in Vienna, Austria — available for full-time roles and contract work",
      ];

export const getHomeInfoCards = (profile) =>
  profile?.homeInfoCards?.length
    ? profile.homeInfoCards
    : DEFAULT_HOME_INFO_CARDS;

export const getHomeWorkflowTitle = (profile) =>
  profile?.homeWorkflowTitle || "How I Work";

export const getHomeWorkflowDescription = (profile) =>
  profile?.homeWorkflowDescription ||
  `${getDisplayName(profile)} builds clear, fast, and maintainable web applications from idea to production. The process starts with the simplest honest version of the user experience, then adds the technical infrastructure that makes it reliable — authentication, data persistence, caching, and deployment. Every decision is made to reduce future maintenance cost, not to demonstrate technical complexity. The output is a product that works well on day one and continues to work well as requirements change.`;

export const getHomeStatusTitle = (profile) =>
  profile?.homeStatusTitle || "Status";

export const getHomeStatusDescription = (profile) =>
  profile?.homeStatusDescription ||
  `${getDisplayName(profile)} is currently building real-world Full-Stack applications and actively seeking full-time and contract opportunities in Vienna, Austria and the wider European market. Available for immediate engagement. Open to remote and hybrid roles in addition to on-site positions in Austria.`;

export const getHighlights = (profile) =>
  profile?.highlights?.length
    ? profile.highlights
    : [
        { label: "Based in", value: profile?.location || "Vienna, Austria" },
        {
          label: "Primary stack",
          value: profile?.primaryStack || DEFAULT_PRIMARY_STACK,
        },
        {
          label: "Current focus",
          value:
            profile?.currentFocus ||
            "Building production-ready web apps with clear UI and reliable backend support",
        },
      ];

export const getAboutParagraphs = (profile) =>
  profile?.aboutParagraphs?.length
    ? profile.aboutParagraphs
    : DEFAULT_ABOUT_PARAGRAPHS;

export const getAboutCards = (profile) =>
  profile?.aboutCards?.length
    ? profile.aboutCards
    : [
        {
          label: "Primary stack",
          value: profile?.primaryStack || DEFAULT_PRIMARY_STACK,
        },
        {
          label: "Working style",
          value: "Fast, practical, and production-focused",
        },
      ];

export const getAboutIntroTitle = (profile) =>
  profile?.aboutIntroTitle ||
  "A short look at how I build fast, production-ready web applications.";

export const getAboutIntroDescription = (profile) =>
  profile?.aboutIntroDescription ||
  `${getDisplayName(profile)} is a Full-Stack Developer based in Vienna, Austria — building fast, production-ready web applications with React, Next.js, Node.js, and MongoDB. This page covers background, process, and approach to building real-world products.`;

export const getAboutSectionTitle = (profile) =>
  profile?.aboutSectionTitle ||
  `${getDisplayName(profile)} — Full-Stack Developer in Vienna, Austria`;

export const getAboutProcessEyebrow = (profile) =>
  profile?.aboutProcessEyebrow || "How I work";

export const getAboutProcessTitle = (profile) =>
  profile?.aboutProcessTitle ||
  "Clear process, thoughtful implementation, and room to grow";

export const getAboutProcessDescription = (profile) =>
  profile?.aboutProcessDescription ||
  `${getDisplayName(profile)} starts every project by clarifying the actual goal — not the assumed goal. From there, the smallest useful version of the experience is built first, and the technical layer is shaped around the product requirements rather than the other way around. This means the API surface stays narrow, the component tree stays flat, and the data model reflects real usage patterns. The result is software that is easy to understand when someone else picks it up, quick to use from day one, and straightforward to modify after launch without triggering unintended side effects. As a Full-Stack Developer working in Vienna, Austria, this process is applied across every engagement — from short contract work to longer product collaborations.`;

export const getFooterText = (profile) =>
  profile?.footerText ||
  `© ${new Date().getFullYear()} ${profile?.fullName || DEFAULT_PROFILE_NAME}. All rights reserved.`;

export const getDisplayName = (profile) =>
  profile?.fullName || DEFAULT_PROFILE_NAME;

export const getJobTitle = (profile) =>
  profile?.jobTitle || "Frontend / Full-Stack Developer";

export const getPrimaryCtaLabel = (profile) =>
  profile?.homePrimaryCtaLabel || "View Projects";

export const getPrimaryCtaUrl = (profile) =>
  profile?.homePrimaryCtaUrl || profile?.portfolioUrl || "/projects";

export const getSecondaryCtaLabel = (profile) =>
  profile?.homeSecondaryCtaLabel || "Hire Me";

export const getSecondaryCtaUrl = (profile) =>
  profile?.homeSecondaryCtaUrl || "/contact";

export const getContactIntroEyebrow = (profile) =>
  profile?.contactIntroEyebrow || "Start here";

export const getContactIntroTitle = (profile) =>
  profile?.contactIntroTitle || "Tell me what you want to build";

export const getContactIntroDescription = (profile) =>
  profile?.contactIntroDescription ||
  "The fastest way to get a useful reply is to include the goal of the project, the expected timeline, and any constraints you already know about. If you have a stack in mind, a reference site, or a rough scope, that is helpful too. The more context you share, the easier it is to suggest a practical path forward.";

export const getContactFormTitle = (profile) =>
  profile?.contactFormTitle || "Project inquiry";

export const getContactPanelTitle = (profile) =>
  profile?.contactPanelTitle || "Contact Information";

export const getContactPanelDescription = (profile) =>
  profile?.contactPanelDescription ||
  "Reach out through the form or use one of the direct channels below if you prefer a quicker intro before sharing the details.";
