const { Schema, trimString } = require("./shared");

const codeSample = new Schema({
  id: {
    type: String,
    required: true,
    index: true,
    unique: true,
    ...trimString,
  },

  title: { type: String, require: true, index: true },
  code: { type: String, require: true, index: true },
  description: { type: String, require: true, index: true },
  like: { type: Number, require: true },
  dislike: {},
  Comment: {},
  replys: {},
});
