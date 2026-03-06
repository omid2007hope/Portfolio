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
    ...softDeleteFields,
  },
  schemaOptions,
);

portfolioProfileSchema.index({ email: 1 }, { unique: true });
portfolioProfileSchema.index({ fullName: 1, isDeleted: 1 });

module.exports =
  mongoose.models.PortfolioProfile ||
  mongoose.model("PortfolioProfile", portfolioProfileSchema);
