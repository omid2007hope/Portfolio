/** @format */

const { Schema, mongoose, optionalUrl, requiredTrimmedString, schemaOptions, softDeleteFields, trimString } = require("./shared");

const linkSchema = new Schema(
  {
    label: requiredTrimmedString("Link label", 80),
    url: {
      ...optionalUrl,
      required: [true, "Link URL is required."],
    },
  },
  { _id: false },
);

const certificateSchema = new Schema(
  {
    title: requiredTrimmedString("Certificate title", 160),
    issuer: {
      ...trimString,
      maxlength: [120, "Issuer cannot exceed 120 characters."],
      default: "",
    },
    issuedAtLabel: {
      ...trimString,
      maxlength: [80, "Issued label cannot exceed 80 characters."],
      default: "",
    },
    score: {
      ...trimString,
      maxlength: [80, "Score cannot exceed 80 characters."],
      default: "",
    },
    credentialUrl: optionalUrl,
  },
  { _id: false },
);

const resumeEntrySchema = new Schema(
  {
    title: requiredTrimmedString("Entry title", 180),
    subtitle: {
      ...trimString,
      maxlength: [180, "Subtitle cannot exceed 180 characters."],
      default: "",
    },
    period: {
      ...trimString,
      maxlength: [100, "Period cannot exceed 100 characters."],
      default: "",
    },
    location: {
      ...trimString,
      maxlength: [160, "Location cannot exceed 160 characters."],
      default: "",
    },
    description: {
      ...trimString,
      maxlength: [2000, "Description cannot exceed 2000 characters."],
      default: "",
    },
    bullets: {
      type: [requiredTrimmedString("Bullet point", 320)],
      default: [],
    },
    sortOrder: {
      type: Number,
      default: 0,
    },
  },
  { _id: false },
);

const skillGroupSchema = new Schema(
  {
    title: requiredTrimmedString("Skill group title", 120),
    items: {
      type: [requiredTrimmedString("Skill item", 100)],
      default: [],
    },
    sortOrder: {
      type: Number,
      default: 0,
    },
  },
  { _id: false },
);

const resumeSchema = new Schema(
  {
    profileName: requiredTrimmedString("Profile name", 120),
    headline: requiredTrimmedString("Resume headline", 160),
    summary: requiredTrimmedString("Resume summary", 2000),
    email: {
      ...trimString,
      lowercase: true,
      required: [true, "Resume email is required."],
      maxlength: [160, "Email cannot exceed 160 characters."],
    },
    phoneNumber: {
      ...trimString,
      maxlength: [40, "Phone number cannot exceed 40 characters."],
      default: "",
    },
    address: {
      ...trimString,
      maxlength: [220, "Address cannot exceed 220 characters."],
      default: "",
    },
    avatarImage: optionalUrl,
    importantLinks: {
      type: [linkSchema],
      default: [],
    },
    languages: {
      type: [requiredTrimmedString("Language", 80)],
      default: [],
    },
    certificates: {
      type: [certificateSchema],
      default: [],
    },
    experience: {
      type: [resumeEntrySchema],
      default: [],
    },
    education: {
      type: [resumeEntrySchema],
      default: [],
    },
    skillGroups: {
      type: [skillGroupSchema],
      default: [],
    },
    ...softDeleteFields,
  },
  schemaOptions,
);

resumeSchema.index({ email: 1, isDeleted: 1 });
resumeSchema.index({ profileName: 1 });

module.exports =
  mongoose.models.Resume || mongoose.model("Resume", resumeSchema);
