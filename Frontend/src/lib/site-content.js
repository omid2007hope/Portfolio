const DEFAULT_PROFILE_NAME = "Omid Teimory";

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
      "As a passionate web developer, I specialize in building intuitive, responsive, and accessible web applications.",
  },
  {
    content:
      "I focus on building products that are both visually sharp and technically solid.",
  },
  {
    content:
      "Let us build something exceptional together. I am open to work, collaborations, and freelance engagements.",
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

export const getHighlights = (profile) =>
  profile?.highlights?.length
    ? profile.highlights
    : [
        { label: "Based in", value: profile?.location || "Vienna, Austria" },
        {
          label: "Primary stack",
          value: profile?.primaryStack || "React, Next.js, Tailwind",
        },
        {
          label: "Current focus",
          value: profile?.currentFocus || "Frontend + backend growth",
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
          value: profile?.primaryStack || "React, Next.js, Tailwind",
        },
        {
          label: "Current focus",
          value: profile?.currentFocus || "Frontend + backend growth",
        },
      ];

export const getFooterText = (profile) =>
  profile?.footerText ||
  `© ${new Date().getFullYear()} ${profile?.fullName || DEFAULT_PROFILE_NAME}. All rights reserved.`;

export const getDisplayName = (profile) =>
  profile?.fullName || DEFAULT_PROFILE_NAME;

export const getJobTitle = (profile) =>
  profile?.jobTitle || "Frontend Developer";
