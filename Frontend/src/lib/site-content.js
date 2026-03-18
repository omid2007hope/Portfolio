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
      "I am a full-stack developer specializing in frontend experiences that feel polished, responsive, and easy to use.",
  },
  {
    content:
      "My work starts with strong UI systems in React and Next.js, then extends into backend architecture when the product needs it.",
  },
  {
    content:
      "I am open to freelance, collaboration, and full-time roles where frontend quality matters just as much as full-stack delivery.",
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
