const DEFAULT_PROFILE_NAME = "Omid Teimory";
const DEFAULT_HERO_DESCRIPTION =
  "I build fast, modern web applications that help businesses grow.";
const DEFAULT_PRIMARY_STACK =
  "React, Next.js, Tailwind CSS, Node.js, MongoDB";

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
    url: "https://www.credly.com/users/omid-teimory/edit#credly",
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
  { label: "Contact", to: "/contact" },
];

const DEFAULT_ABOUT_PARAGRAPHS = [
  {
    content:
      "I build complete web applications from idea to launch, starting with a clear frontend and the simplest useful user flow.",
  },
  {
    content:
      "When a project needs more than good visuals, I connect the interface to APIs, authentication, and data flows without making the product feel heavy.",
  },
  {
    content:
      "The goal is always the same: fast pages, clean structure, and code that is easy to maintain after launch.",
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

export const ensureResumeLink = (items = []) => {
  if (items.some((item) => item.to === "/resume")) {
    return items;
  }

  return [
    ...items.slice(0, 3),
    { label: "Resume", to: "/resume" },
    ...items.slice(3),
  ];
};

export const getNavigationLinks = (profile) =>
  ensureResumeLink(
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
  `${DEFAULT_PRIMARY_STACK}, and production-ready UI systems.`;

export const getHomeNextStepTitle = (profile) =>
  profile?.homeNextStepTitle || "Next step";

export const getHomeNextStepText = (profile) =>
  profile?.homeNextStepText ||
  "I build with frontend quality first, then support it with backend structure, APIs, and data flows that keep the product fast, reliable, and maintainable.";

export const getHomeSectionEyebrow = (profile) =>
  profile?.homeSectionEyebrow || "What I Do";

export const getHomeSectionTitle = (profile) =>
  profile?.homeSectionTitle ||
  "I build complete web applications from frontend to backend.";

export const getHomeSectionDescription = (profile) =>
  profile?.homeSectionDescription ||
  "I focus on speed, clarity, and real-world usability so the product feels polished for users and easy to maintain for the team.";

export const getHomeSectionItems = (profile) =>
  profile?.homeSectionItems?.length
    ? profile.homeSectionItems
    : [
        "Modern frontend development with React and Next.js",
        "Backend APIs and authentication systems with Node.js",
        "Clean, scalable architecture for real-world applications",
      ];

export const getHomeInfoCards = (profile) =>
  profile?.homeInfoCards?.length ? profile.homeInfoCards : DEFAULT_HOME_INFO_CARDS;

export const getHomeWorkflowTitle = (profile) =>
  profile?.homeWorkflowTitle || "How I Work";

export const getHomeWorkflowDescription = (profile) =>
  profile?.homeWorkflowDescription ||
  "I focus on building clear, fast, and maintainable applications from idea to production.";

export const getHomeStatusTitle = (profile) =>
  profile?.homeStatusTitle || "Status";

export const getHomeStatusDescription = (profile) =>
  profile?.homeStatusDescription ||
  "Currently building real-world full-stack applications and actively seeking opportunities in Austria.";

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
  `A short look at how ${getDisplayName(profile)} builds fast, production-ready web applications.`;

export const getAboutSectionTitle = (profile) =>
  profile?.aboutSectionTitle || DEFAULT_HERO_DESCRIPTION;

export const getAboutProcessEyebrow = (profile) =>
  profile?.aboutProcessEyebrow || "How I work";

export const getAboutProcessTitle = (profile) =>
  profile?.aboutProcessTitle ||
  "Clear process, thoughtful implementation, and room to grow";

export const getAboutProcessDescription = (profile) =>
  profile?.aboutProcessDescription ||
  "I start by clarifying the goal, then build the smallest useful version of the experience and shape the technical layer around that. The result is work that is easy to understand, quick to use, and straightforward to maintain after launch.";

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
