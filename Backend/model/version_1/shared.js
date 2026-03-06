/** @format */

const mongoose = require("mongoose");

const { Schema } = mongoose;

const softDeleteFields = {
  isDeleted: {
    type: Boolean,
    default: false,
    index: true,
  },
  deletedBy: {
    type: String,
    default: "",
    trim: true,
  },
};

const trimString = {
  type: String,
  trim: true,
};

const requiredTrimmedString = (label, maxLength = 200) => ({
  ...trimString,
  required: [true, `${label} is required.`],
  maxlength: [maxLength, `${label} cannot exceed ${maxLength} characters.`],
});

const optionalUrl = {
  ...trimString,
  default: "",
};

const schemaOptions = {
  timestamps: true,
  versionKey: false,
};

module.exports = {
  Schema,
  mongoose,
  optionalUrl,
  requiredTrimmedString,
  schemaOptions,
  softDeleteFields,
  trimString,
};
