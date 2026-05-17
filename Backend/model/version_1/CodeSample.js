const {
  Schema,
  mongoose,
  requiredTrimmedString,
  schemaOptions,
  trimString,
} = require("./shared");

const codeSampleSchema = new Schema(
  {
    id: { ...requiredTrimmedString("ID"), index: true, unique: true },
    title: { ...requiredTrimmedString("Title"), index: true },
    code: requiredTrimmedString("Code", 20000),
    description: { ...trimString, default: "" },
  },
  schemaOptions,
);

module.exports = mongoose.model("CodeSample", codeSampleSchema);
