const DEFAULT_PROFILE_NAME = "Omid Teimory";
const DEFAULT_HERO_DESCRIPTION =
  "I build fast, modern web applications that help businesses grow.";

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

export const getHighlights = (profile) =>
  profile?.highlights?.length
    ? profile.highlights
    : [
        { label: "Based in", value: profile?.location || "Vienna, Austria" },
        {
          label: "Primary stack",
          value:
            profile?.primaryStack ||
            "React, Next.js, Tailwind CSS, Node.js, MongoDB",
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
          value:
            profile?.primaryStack ||
            "React, Next.js, Tailwind CSS, Node.js, MongoDB",
        },
        {
          label: "Working style",
          value: "Fast, practical, and production-focused",
        },
      ];

export const getFooterText = (profile) =>
  profile?.footerText ||
  `© ${new Date().getFullYear()} ${profile?.fullName || DEFAULT_PROFILE_NAME}. All rights reserved.`;

export const getDisplayName = (profile) =>
  profile?.fullName || DEFAULT_PROFILE_NAME;

export const getJobTitle = (profile) =>
  profile?.jobTitle || "Frontend / Full-Stack Developer";
