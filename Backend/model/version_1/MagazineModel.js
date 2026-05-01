/** @format */

const {
  Schema,
  mongoose,
  optionalUrl,
  requiredTrimmedString,
  schemaOptions,
  softDeleteFields,
  trimString,
} = require("./shared");

const magazineSchema = new Schema(
  {
    magazineId: {
      type: Number,
      required: [true, "Magazine id is required."],
    },

    photo: optionalUrl,

    title: requiredTrimmedString("Magazine title", 100),

    description: requiredTrimmedString("Magazine description", 500),

    date: {
      type: String,
      trim: true,
      required: [true, "Magazine date is required."],
    },

    ...softDeleteFields,
  },
  schemaOptions,
);

magazineSchema.index({ magazineId: 1 }, { unique: true });
magazineSchema.index({ title: 1 });
magazineSchema.index({ date: 1, isDeleted: 1 });

module.exports =
  mongoose.models.Magazine || mongoose.model("Magazine", magazineSchema);
