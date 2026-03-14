const DEFAULT_SITE_URL = "https://omidteimory.com";
const DEFAULT_SITE_NAME = "Portfolio Prime";
const DEFAULT_PERSON_NAME = "Omid Teimory";
const DEFAULT_JOB_TITLE = "Frontend Developer";
const DEFAULT_LOCATION = "Vienna, Austria";
const DEFAULT_DESCRIPTION =
  "Omid Teimory is a frontend developer in Vienna, Austria building performant Next.js, React, and full-stack web experiences.";
const DEFAULT_KEYWORDS = [
  "Omid Teimory",
  "Portfolio Prime",
  "frontend developer Austria",
  "frontend developer Vienna",
  "Next.js developer Austria",
  "React developer Vienna",
  "web developer Austria",
  "full-stack developer Austria",
];

const SOCIAL_NAME_MAP = {
  github: ["github"],
  linkedin: ["linkedin"],
  x: ["x", "twitter"],
};

const trimTrailingSlash = (value) => value.replace(/\/+$/, "");

const dedupe = (values = []) =>
  [...new Set(values.filter(Boolean).map((value) => String(value).trim()))];

const normalizePath = (path = "/") => {
  if (!path) {
    return "/";
  }

  if (/^https?:\/\//i.test(path)) {
    return path;
  }

  return path.startsWith("/") ? path : `/${path}`;
};

const pickFirstValidUrl = (...values) => {
  for (const value of values) {
    const candidate = value?.trim();

    if (!candidate) {
      continue;
    }

    try {
      return trimTrailingSlash(new URL(candidate).toString());
    } catch (_error) {
      continue;
    }
  }

  return DEFAULT_SITE_URL;
};

const toThingList = (values = []) =>
  dedupe(values).map((value) => ({
    "@type": "Thing",
    name: value,
  }));

const findSocialUrl = (profile, key) => {
  const aliases = SOCIAL_NAME_MAP[key] || [key];
  const socialLinks = profile?.socialLinks || [];

  const match = socialLinks.find((item) => {
    const iconKey = item?.iconKey?.toLowerCase();
    const name = item?.name?.toLowerCase();

    return aliases.some((alias) => alias === iconKey || alias === name);
  });

  return match?.url;
};

const getTwitterHandle = (profile) => {
  const url = findSocialUrl(profile, "x");

  if (!url) {
    return undefined;
  }

  try {
    const pathname = new URL(url).pathname.split("/").filter(Boolean);
    return pathname[0] ? `@${pathname[0]}` : undefined;
  } catch (_error) {
    return undefined;
  }
};

const getResumeSkills = (resume) =>
  (resume?.skillGroups || []).flatMap((group) => group?.items || []);

export const getSiteUrl = (profile) =>
  pickFirstValidUrl(
    process.env.NEXT_PUBLIC_SITE_URL,
    process.env.SITE_URL,
    profile?.portfolioUrl,
    DEFAULT_SITE_URL,
  );

export const absoluteUrl = (path = "/", profile) => {
  if (/^https?:\/\//i.test(path)) {
    return path;
  }

  return new URL(normalizePath(path), `${getSiteUrl(profile)}/`).toString();
};

export const getSeoProfile = (profile, resume) => {
  const personName =
    profile?.fullName || resume?.profileName || DEFAULT_PERSON_NAME;
  const jobTitle =
    profile?.jobTitle || resume?.headline || DEFAULT_JOB_TITLE;
  const headline = profile?.headline || resume?.headline || jobTitle;
  const description =
    profile?.shortBio || resume?.summary || DEFAULT_DESCRIPTION;
  const longDescription = profile?.longBio || description;
  const location = profile?.location || resume?.address || DEFAULT_LOCATION;
  const siteUrl = getSiteUrl(profile);
  const sameAs = dedupe([
    findSocialUrl(profile, "github"),
    findSocialUrl(profile, "linkedin"),
    findSocialUrl(profile, "x"),
    ...(resume?.importantLinks || []).map((link) => link?.url),
  ]);
  const skills = dedupe([
    ...(profile?.heroSkills || []),
    ...(getResumeSkills(resume) || []),
    ...(profile?.primaryStack || "")
      .split(",")
      .map((entry) => entry.trim())
      .filter(Boolean),
  ]);

  return {
    siteName: DEFAULT_SITE_NAME,
    siteUrl,
    personName,
    jobTitle,
    headline,
    description,
    longDescription,
    location,
    locale: "en_US",
    htmlLang: "en-AT",
    sameAs,
    skills,
    email: profile?.email || resume?.email,
    phoneNumber: profile?.phoneNumber || resume?.phoneNumber,
    address: profile?.address || resume?.address,
    image:
      profile?.portraitImage || resume?.avatarImage || absoluteUrl("/favicon.ico", profile),
    twitterHandle: getTwitterHandle(profile),
    keywords: dedupe([
      ...DEFAULT_KEYWORDS,
      personName,
      `${personName} portfolio`,
      `${jobTitle} Austria`,
      `${jobTitle} Vienna`,
      ...skills,
    ]),
  };
};

const buildRobotsValue = (noIndex = false) => ({
  index: !noIndex,
  follow: !noIndex,
  googleBot: {
    index: !noIndex,
    follow: !noIndex,
    "max-image-preview": "large",
    "max-snippet": -1,
    "max-video-preview": -1,
  },
});

const buildVerification = () => {
  const google = process.env.GOOGLE_SITE_VERIFICATION?.trim();
  const yandex = process.env.YANDEX_SITE_VERIFICATION?.trim();
  const bing = process.env.BING_SITE_VERIFICATION?.trim();

  return {
    ...(google ? { google } : {}),
    ...(yandex ? { yandex } : {}),
    ...(bing ? { other: { "msvalidate.01": bing } } : {}),
  };
};

export const buildRootMetadata = (profile, resume) => {
  const seo = getSeoProfile(profile, resume);
  const defaultTitle = `${seo.siteName} | ${seo.personName}`;
  const verification = buildVerification();

  return {
    metadataBase: new URL(seo.siteUrl),
    applicationName: seo.siteName,
    title: {
      default: defaultTitle,
      template: `%s | ${seo.personName}`,
    },
    description: seo.description,
    keywords: seo.keywords,
    authors: [{ name: seo.personName, url: seo.siteUrl }],
    creator: seo.personName,
    publisher: seo.personName,
    category: "technology",
    referrer: "origin-when-cross-origin",
    alternates: {
      canonical: "/",
    },
    robots: buildRobotsValue(false),
    openGraph: {
      title: defaultTitle,
      description: seo.description,
      url: "/",
      siteName: seo.siteName,
      locale: seo.locale,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: defaultTitle,
      description: seo.description,
      ...(seo.twitterHandle ? { creator: seo.twitterHandle } : {}),
    },
    ...(Object.keys(verification).length ? { verification } : {}),
  };
};

export const buildPageMetadata = ({
  profile,
  resume,
  title,
  description,
  path,
  keywords = [],
  image,
  imageAlt,
  type = "website",
  noIndex = false,
}) => {
  const seo = getSeoProfile(profile, resume);
  const canonical = normalizePath(path);
  const resolvedTitle = title || seo.siteName;
  const resolvedDescription = description || seo.description;
  const resolvedImage = image ? absoluteUrl(image, profile) : undefined;

  return {
    title: resolvedTitle,
    description: resolvedDescription,
    keywords: dedupe([...seo.keywords, ...keywords]),
    alternates: {
      canonical,
    },
    category: "technology",
    robots: buildRobotsValue(noIndex),
    openGraph: {
      title: resolvedTitle,
      description: resolvedDescription,
      url: canonical,
      siteName: seo.siteName,
      locale: seo.locale,
      type,
      ...(resolvedImage
        ? {
            images: [
              {
                url: resolvedImage,
                width: 1200,
                height: 630,
                alt: imageAlt || resolvedTitle,
              },
            ],
          }
        : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: resolvedTitle,
      description: resolvedDescription,
      ...(seo.twitterHandle ? { creator: seo.twitterHandle } : {}),
      ...(resolvedImage ? { images: [resolvedImage] } : {}),
    },
  };
};

export const buildPersonJsonLd = (profile, resume) => {
  const seo = getSeoProfile(profile, resume);

  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: seo.personName,
    url: seo.siteUrl,
    image: seo.image,
    jobTitle: seo.jobTitle,
    description: seo.longDescription,
    knowsAbout: seo.skills,
    sameAs: seo.sameAs,
    ...(seo.email ? { email: `mailto:${seo.email}` } : {}),
    ...(seo.phoneNumber ? { telephone: seo.phoneNumber } : {}),
    ...(seo.location
      ? {
          homeLocation: {
            "@type": "Place",
            name: seo.location,
          },
        }
      : {}),
    ...(seo.address
      ? {
          address: {
            "@type": "PostalAddress",
            addressLocality: seo.address,
            addressCountry: "AT",
          },
        }
      : {}),
  };
};

const buildPersonReferenceJsonLd = (profile, resume) => {
  const seo = getSeoProfile(profile, resume);

  return {
    "@type": "Person",
    name: seo.personName,
    url: seo.siteUrl,
    image: seo.image,
    jobTitle: seo.jobTitle,
    description: seo.longDescription,
    sameAs: seo.sameAs,
  };
};

export const buildWebsiteJsonLd = (profile, resume) => {
  const seo = getSeoProfile(profile, resume);

  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: seo.siteName,
    url: seo.siteUrl,
    description: seo.description,
    inLanguage: seo.htmlLang,
    publisher: {
      "@type": "Person",
      name: seo.personName,
      url: seo.siteUrl,
    },
  };
};

export const buildWebPageJsonLd = ({
  profile,
  resume,
  path,
  title,
  description,
  type = "WebPage",
  mainEntity,
}) => {
  const seo = getSeoProfile(profile, resume);
  const resolvedMainEntity =
    mainEntity ?? (type === "ProfilePage" ? buildPersonReferenceJsonLd(profile, resume) : undefined);

  return {
    "@context": "https://schema.org",
    "@type": type,
    name: title,
    description,
    url: absoluteUrl(path, profile),
    inLanguage: seo.htmlLang,
    isPartOf: {
      "@type": "WebSite",
      name: seo.siteName,
      url: seo.siteUrl,
    },
    about: {
      "@type": "Person",
      name: seo.personName,
      url: seo.siteUrl,
    },
    ...(resolvedMainEntity ? { mainEntity: resolvedMainEntity } : {}),
  };
};

export const buildBreadcrumbJsonLd = (items, profile) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((item, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: item.name,
    item: absoluteUrl(item.path, profile),
  })),
});

export const buildProjectsPageJsonLd = (projects, profile, resume) => {
  const seo = getSeoProfile(profile, resume);

  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `${seo.personName} Projects`,
    description:
      "Case studies and selected web development projects built with Next.js, React, and modern frontend tooling.",
    url: absoluteUrl("/projects", profile),
    mainEntity: {
      "@type": "ItemList",
      itemListOrder: "https://schema.org/ItemListOrderAscending",
      numberOfItems: projects.length,
      itemListElement: projects.map((project, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: absoluteUrl(`/project/${project.slug || project.projectId}`, profile),
        name: project.title,
      })),
    },
  };
};

export const buildProjectJsonLd = (project, profile, resume) => {
  const seo = getSeoProfile(profile, resume);

  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    headline: project.title,
    description: project.overview || project.shortDescription,
    abstract: project.shortDescription,
    url: absoluteUrl(`/project/${project.slug || project.projectId}`, profile),
    image: project.coverImage?.url,
    creator: {
      "@type": "Person",
      name: seo.personName,
      url: seo.siteUrl,
    },
    keywords: dedupe(project.techStack || []),
    genre: "Web development project",
    inLanguage: seo.htmlLang,
    isAccessibleForFree: true,
    sameAs: dedupe([project.liveDemoUrl, project.repositoryUrl]),
    dateCreated: project.createdAt,
    dateModified: project.updatedAt,
    about: toThingList(project.techStack || []),
  };
};
