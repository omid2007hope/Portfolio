/** @format */

const { Schema, mongoose, schemaOptions, softDeleteFields, trimString } = require("./shared");

const chatMessageSchema = new Schema(
  {
    sender: {
      type: String,
      trim: true,
      enum: ["user", "assistant", "system"],
      required: [true, "Message sender is required."],
    },
    text: {
      ...trimString,
      required: [true, "Message text is required."],
      maxlength: [8000, "Message text cannot exceed 8000 characters."],
    },
    sentAt: {
      type: Date,
      default: Date.now,
    },
  },
  { _id: false },
);

const chatConversationSchema = new Schema(
  {
    sessionId: {
      ...trimString,
      required: [true, "Session id is required."],
      maxlength: [120, "Session id cannot exceed 120 characters."],
    },
    title: {
      ...trimString,
      maxlength: [160, "Conversation title cannot exceed 160 characters."],
      default: "",
    },
    status: {
      type: String,
      trim: true,
      enum: ["active", "closed", "errored"],
      default: "active",
    },
    messages: {
      type: [chatMessageSchema],
      default: [],
    },
    lastMessageAt: {
      type: Date,
      default: Date.now,
    },
    ...softDeleteFields,
  },
  schemaOptions,
);

chatConversationSchema.index({ sessionId: 1 }, { unique: true });
chatConversationSchema.index({ status: 1, lastMessageAt: -1 });

module.exports =
  mongoose.models.ChatConversation ||
  mongoose.model("ChatConversation", chatConversationSchema);
