const {
  Schema,
  mongoose,
  schemaOptions,
  requiredTrimmedString,
  trimString,
} = require("./shared");

const userSchema = new Schema(
  {
    id: { ...requiredTrimmedString("ID"), index: true, unique: true },
    name: { ...requiredTrimmedString("Name"), index: true, unique: true },
    email: {
      ...trimString,
      lowercase: true,
      default: "",
      index: true,
      sparse: true,
      unique: true,
    },
    isEmailVerified: {
      type: Boolean,
      default: false,
      index: true,
    },
    loginCodeHash: {
      ...trimString,
      default: "",
    },
    loginCodeExpiresAt: {
      type: Date,
      default: null,
    },
    authTokenVersion: {
      type: Number,
      default: 1,
      min: 1,
    },
  },
  schemaOptions,
);

module.exports = mongoose.model("User", userSchema);
