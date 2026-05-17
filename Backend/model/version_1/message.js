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
    message: requiredTrimmedString("Message", 2000),
    likes: [trimString],
    dislikes: [trimString],
  },
  schemaOptions,
);

module.exports = mongoose.model("Message", messageSchema);
