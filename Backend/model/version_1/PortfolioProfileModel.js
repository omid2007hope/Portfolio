/** @format */

const { Schema, mongoose, optionalUrl, requiredTrimmedString, schemaOptions, softDeleteFields, trimString } = require("./shared");

const socialLinkSchema = new Schema(
  {
    name: requiredTrimmedString("Social link name", 60),
    iconKey: {
      ...trimString,
      maxlength: [40, "Icon key cannot exceed 40 characters."],
      default: "",
    },
    url: {
      ...optionalUrl,
      required: [true, "Social link URL is required."],
    },
  },
  { _id: false },
);

const highlightSchema = new Schema(
  {
    label: requiredTrimmedString("Highlight label", 80),
    value: requiredTrimmedString("Highlight value", 180),
  },
  { _id: false },
);

const keyValueCardSchema = new Schema(
  {
    label: requiredTrimmedString("Card label", 80),
    value: requiredTrimmedString("Card value", 180),
  },
  { _id: false },
);

const aboutParagraphSchema = new Schema(
  {
    content: requiredTrimmedString("About paragraph", 1200),
  },
  { _id: false },
);

const textCardSchema = new Schema(
  {
    title: requiredTrimmedString("Card title", 120),
    text: requiredTrimmedString("Card text", 600),
  },
  { _id: false },
);

const navigationLinkSchema = new Schema(
  {
    label: requiredTrimmedString("Navigation label", 60),
    to: requiredTrimmedString("Navigation route", 160),
  },
  { _id: false },
);

const portfolioProfileSchema = new Schema(
  {
    fullName: requiredTrimmedString("Full name", 120),
    jobTitle: requiredTrimmedString("Job title", 120),
    headline: requiredTrimmedString("Headline", 180),
    shortBio: requiredTrimmedString("Short bio", 1000),
    longBio: {
      ...trimString,
      maxlength: [3000, "Long bio cannot exceed 3000 characters."],
      default: "",
    },
    heroBadge: {
      ...trimString,
      maxlength: [160, "Hero badge cannot exceed 160 characters."],
      default: "",
    },
    headerBannerText: {
      ...trimString,
      maxlength: [200, "Header banner text cannot exceed 200 characters."],
      default: "",
    },
    headerAvailabilityText: {
      ...trimString,
      maxlength: [200, "Header availability text cannot exceed 200 characters."],
      default: "",
    },
    headerContactCtaLabel: {
      ...trimString,
      maxlength: [80, "Header CTA label cannot exceed 80 characters."],
      default: "",
    },
    availabilityText: {
      ...trimString,
      maxlength: [200, "Availability text cannot exceed 200 characters."],
      default: "",
    },
    currentFocus: {
      ...trimString,
      maxlength: [240, "Current focus cannot exceed 240 characters."],
      default: "",
    },
    homeEyebrow: {
      ...trimString,
      maxlength: [120, "Home eyebrow cannot exceed 120 characters."],
      default: "",
    },
    homeTitle: {
      ...trimString,
      maxlength: [220, "Home title cannot exceed 220 characters."],
      default: "",
    },
    homeDescription: {
      ...trimString,
      maxlength: [300, "Home description cannot exceed 300 characters."],
      default: "",
    },
    homeAvailabilityNote: {
      ...trimString,
      maxlength: [200, "Home availability note cannot exceed 200 characters."],
      default: "",
    },
    homeSupportText: {
      ...trimString,
      maxlength: [200, "Home support text cannot exceed 200 characters."],
      default: "",
    },
    homeFeaturedTitle: {
      ...trimString,
      maxlength: [220, "Home featured title cannot exceed 220 characters."],
      default: "",
    },
    homeFeaturedDescription: {
      ...trimString,
      maxlength: [400, "Home featured description cannot exceed 400 characters."],
      default: "",
    },
    homeStrengthsTitle: {
      ...trimString,
      maxlength: [120, "Home strengths title cannot exceed 120 characters."],
      default: "",
    },
    homeStrengthsText: {
      ...trimString,
      maxlength: [400, "Home strengths text cannot exceed 400 characters."],
      default: "",
    },
    homeNextStepTitle: {
      ...trimString,
      maxlength: [120, "Home next-step title cannot exceed 120 characters."],
      default: "",
    },
    homeNextStepText: {
      ...trimString,
      maxlength: [400, "Home next-step text cannot exceed 400 characters."],
      default: "",
    },
    homeSectionEyebrow: {
      ...trimString,
      maxlength: [120, "Home section eyebrow cannot exceed 120 characters."],
      default: "",
    },
    homeSectionTitle: {
      ...trimString,
      maxlength: [220, "Home section title cannot exceed 220 characters."],
      default: "",
    },
    homeSectionDescription: {
      ...trimString,
      maxlength: [500, "Home section description cannot exceed 500 characters."],
      default: "",
    },
    homeSectionItems: {
      type: [requiredTrimmedString("Home section item", 220)],
      default: [],
    },
    homeInfoCards: {
      type: [textCardSchema],
      default: [],
    },
    homeWorkflowTitle: {
      ...trimString,
      maxlength: [220, "Home workflow title cannot exceed 220 characters."],
      default: "",
    },
    homeWorkflowDescription: {
      ...trimString,
      maxlength: [500, "Home workflow description cannot exceed 500 characters."],
      default: "",
    },
    homeStatusTitle: {
      ...trimString,
      maxlength: [120, "Home status title cannot exceed 120 characters."],
      default: "",
    },
    homeStatusDescription: {
      ...trimString,
      maxlength: [400, "Home status description cannot exceed 400 characters."],
      default: "",
    },
    location: requiredTrimmedString("Location", 160),
    address: {
      ...trimString,
      maxlength: [220, "Address cannot exceed 220 characters."],
      default: "",
    },
    email: {
      ...trimString,
      lowercase: true,
      required: [true, "Email is required."],
      maxlength: [160, "Email cannot exceed 160 characters."],
    },
    phoneNumber: {
      ...trimString,
      maxlength: [40, "Phone number cannot exceed 40 characters."],
      default: "",
    },
    portfolioUrl: optionalUrl,
    primaryStack: {
      ...trimString,
      maxlength: [200, "Primary stack cannot exceed 200 characters."],
      default: "",
    },
    openToWork: {
      type: Boolean,
      default: true,
    },
    portraitImage: optionalUrl,
    logoImage: optionalUrl,
    heroSkills: {
      type: [requiredTrimmedString("Skill", 80)],
      default: [],
    },
    spokenLanguages: {
      type: [requiredTrimmedString("Language", 80)],
      default: [],
    },
    socialLinks: {
      type: [socialLinkSchema],
      default: [],
    },
    highlights: {
      type: [highlightSchema],
      default: [],
    },
    aboutCards: {
      type: [keyValueCardSchema],
      default: [],
    },
    aboutParagraphs: {
      type: [aboutParagraphSchema],
      default: [],
    },
    aboutIntroTitle: {
      ...trimString,
      maxlength: [220, "About intro title cannot exceed 220 characters."],
      default: "",
    },
    aboutIntroDescription: {
      ...trimString,
      maxlength: [500, "About intro description cannot exceed 500 characters."],
      default: "",
    },
    aboutSectionTitle: {
      ...trimString,
      maxlength: [220, "About section title cannot exceed 220 characters."],
      default: "",
    },
    aboutProcessEyebrow: {
      ...trimString,
      maxlength: [120, "About process eyebrow cannot exceed 120 characters."],
      default: "",
    },
    aboutProcessTitle: {
      ...trimString,
      maxlength: [220, "About process title cannot exceed 220 characters."],
      default: "",
    },
    aboutProcessDescription: {
      ...trimString,
      maxlength: [1000, "About process description cannot exceed 1000 characters."],
      default: "",
    },
    navigationLinks: {
      type: [navigationLinkSchema],
      default: [],
    },
    footerText: {
      ...trimString,
      maxlength: [200, "Footer text cannot exceed 200 characters."],
      default: "",
    },
    homePrimaryCtaLabel: {
      ...trimString,
      maxlength: [80, "Primary CTA label cannot exceed 80 characters."],
      default: "",
    },
    homePrimaryCtaUrl: optionalUrl,
    homeSecondaryCtaLabel: {
      ...trimString,
      maxlength: [80, "Secondary CTA label cannot exceed 80 characters."],
      default: "",
    },
    homeSecondaryCtaUrl: optionalUrl,
    contactIntroEyebrow: {
      ...trimString,
      maxlength: [120, "Contact intro eyebrow cannot exceed 120 characters."],
      default: "",
    },
    contactIntroTitle: {
      ...trimString,
      maxlength: [220, "Contact intro title cannot exceed 220 characters."],
      default: "",
    },
    contactIntroDescription: {
      ...trimString,
      maxlength: [1000, "Contact intro description cannot exceed 1000 characters."],
      default: "",
    },
    contactFormTitle: {
      ...trimString,
      maxlength: [160, "Contact form title cannot exceed 160 characters."],
      default: "",
    },
    contactPanelTitle: {
      ...trimString,
      maxlength: [160, "Contact panel title cannot exceed 160 characters."],
      default: "",
    },
    contactPanelDescription: {
      ...trimString,
      maxlength: [600, "Contact panel description cannot exceed 600 characters."],
      default: "",
    },
    ...softDeleteFields,
  },
  schemaOptions,
);

portfolioProfileSchema.index({ email: 1 }, { unique: true });
portfolioProfileSchema.index({ fullName: 1, isDeleted: 1 });

module.exports =
  mongoose.models.PortfolioProfile ||
  mongoose.model("PortfolioProfile", portfolioProfileSchema);
