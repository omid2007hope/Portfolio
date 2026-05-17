const {
  Schema,
  mongoose,
  schemaOptions,
  requiredTrimmedString,
  trimString,
} = require("./shared");

const messageSchema = new Schema(
  {
    id: { ...requiredTrimmedString("ID"), index: true, ref: "User" },
    userName: { ...trimString, default: "" },
    scope: {
      type: String,
      enum: ["group", "magazine", "qanda"],
      default: "group",
      index: true,
    },
    targetId: { ...trimString, default: "global", index: true },
    message: requiredTrimmedString("Message", 2000),
    likes: [trimString],
    dislikes: [trimString],
  },
  schemaOptions,
);

module.exports = mongoose.model("Message", messageSchema);
