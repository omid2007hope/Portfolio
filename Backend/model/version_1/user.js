const {
  Schema,
  mongoose,
  schemaOptions,
  requiredTrimmedString,
} = require("./shared");

const userSchema = new Schema(
  {
    id: { ...requiredTrimmedString("ID"), index: true, unique: true },
    name: { ...requiredTrimmedString("Name"), index: true, unique: true },
  },
  schemaOptions,
);

module.exports = mongoose.model("User", userSchema);
