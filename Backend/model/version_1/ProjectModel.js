/** @format */

const { Schema, mongoose, optionalUrl, requiredTrimmedString, schemaOptions, softDeleteFields, trimString } = require("./shared");

const projectImageSchema = new Schema(
  {
    url: {
      ...optionalUrl,
      required: [true, "Project image URL is required."],
    },
    alt: {
      ...trimString,
      maxlength: [180, "Image alt text cannot exceed 180 characters."],
      default: "",
    },
    kind: {
      type: String,
      trim: true,
      enum: ["cover", "showcase", "thumbnail"],
      default: "showcase",
    },
  },
  { _id: false },
);

const projectActionSchema = new Schema(
  {
    label: requiredTrimmedString("Action label", 80),
    url: {
      ...optionalUrl,
      required: [true, "Action URL is required."],
    },
    kind: {
      type: String,
      trim: true,
      enum: ["liveDemo", "source", "caseStudy", "other"],
      default: "other",
    },
  },
  { _id: false },
);

const projectSchema = new Schema(
  {
    projectId: {
      type: Number,
      required: [true, "Project id is required."],
      min: [0, "Project id cannot be negative."],
    },
    slug: requiredTrimmedString("Project slug", 120),
    title: requiredTrimmedString("Project title", 160),
    shortDescription: requiredTrimmedString("Project short description", 320),
    overview: {
      ...trimString,
      maxlength: [2000, "Overview cannot exceed 2000 characters."],
      default: "",
    },
    challengesAndSolutions: {
      ...trimString,
      maxlength: [2000, "Challenges text cannot exceed 2000 characters."],
      default: "",
    },
    improvements: {
      ...trimString,
      maxlength: [1200, "Improvements text cannot exceed 1200 characters."],
      default: "",
    },
    highlightQuote: {
      ...trimString,
      maxlength: [300, "Highlight quote cannot exceed 300 characters."],
      default: "",
    },
    role: {
      ...trimString,
      maxlength: [80, "Role cannot exceed 80 characters."],
      default: "Developer",
    },
    duration: {
      ...trimString,
      maxlength: [80, "Duration cannot exceed 80 characters."],
      default: "",
    },
    status: {
      type: String,
      trim: true,
      enum: ["draft", "published", "in-progress", "archived"],
      default: "published",
    },
    featured: {
      type: Boolean,
      default: false,
    },
    techStack: {
      type: [requiredTrimmedString("Tech item", 80)],
      default: [],
    },
    coverImage: projectImageSchema,
    showcaseImages: {
      type: [projectImageSchema],
      default: [],
    },
    actions: {
      type: [projectActionSchema],
      default: [],
    },
    repositoryUrl: optionalUrl,
    liveDemoUrl: optionalUrl,
    sortOrder: {
      type: Number,
      default: 0,
    },
    ...softDeleteFields,
  },
  schemaOptions,
);

projectSchema.index({ projectId: 1 }, { unique: true });
projectSchema.index({ slug: 1 }, { unique: true });
projectSchema.index({ featured: 1, sortOrder: 1, isDeleted: 1 });

module.exports =
  mongoose.models.Project || mongoose.model("Project", projectSchema);
