const DEFAULT_PROFILE_NAME = "Omid Teimory";
const DEFAULT_HERO_DESCRIPTION =
  "Frontend-focused full-stack developer in Vienna, Austria building fast React and Next.js products with scalable APIs and polished user experiences.";

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
      "I build full-stack products with a frontend-first mindset, shaping the user experience in React and Next.js before expanding into the backend pieces that keep the product reliable.",
  },
  {
    content:
      "My process favors clear information architecture, reusable UI systems, and careful performance work so every page stays fast, readable, and easy to maintain as the product grows.",
  },
  {
    content:
      "I enjoy working on projects where design, implementation, and delivery all matter, whether that means a polished portfolio, a content-driven marketing site, or a production application.",
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
            "Frontend-led product work with backend architecture, APIs, and data flows that keep the experience fast and maintainable",
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
          label: "Current focus",
          value:
            profile?.currentFocus ||
            "Frontend-led product work with backend architecture support",
        },
      ];

export const getFooterText = (profile) =>
  profile?.footerText ||
  `© ${new Date().getFullYear()} ${profile?.fullName || DEFAULT_PROFILE_NAME}. All rights reserved.`;

export const getDisplayName = (profile) =>
  profile?.fullName || DEFAULT_PROFILE_NAME;

export const getJobTitle = (profile) =>
  profile?.jobTitle || "Full-Stack Developer";
