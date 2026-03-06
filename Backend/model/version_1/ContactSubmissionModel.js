/** @format */

const { Schema, mongoose, requiredTrimmedString, schemaOptions, softDeleteFields, trimString } = require("./shared");

const contactSubmissionSchema = new Schema(
  {
    name: requiredTrimmedString("Sender name", 120),
    email: {
      ...trimString,
      lowercase: true,
      required: [true, "Sender email is required."],
      maxlength: [160, "Sender email cannot exceed 160 characters."],
    },
    subject: requiredTrimmedString("Subject", 180),
    message: requiredTrimmedString("Message", 5000),
    status: {
      type: String,
      trim: true,
      enum: ["new", "read", "replied", "archived", "spam"],
      default: "new",
    },
    source: {
      type: String,
      trim: true,
      enum: ["portfolio-contact-form", "manual", "other"],
      default: "portfolio-contact-form",
    },
    ipAddress: {
      ...trimString,
      maxlength: [80, "IP address cannot exceed 80 characters."],
      default: "",
    },
    userAgent: {
      ...trimString,
      maxlength: [500, "User agent cannot exceed 500 characters."],
      default: "",
    },
    respondedAt: {
      type: Date,
      default: null,
    },
    ...softDeleteFields,
  },
  schemaOptions,
);

contactSubmissionSchema.index({ status: 1, createdAt: -1, isDeleted: 1 });
contactSubmissionSchema.index({ email: 1, createdAt: -1 });

module.exports =
  mongoose.models.ContactSubmission ||
  mongoose.model("ContactSubmission", contactSubmissionSchema);
