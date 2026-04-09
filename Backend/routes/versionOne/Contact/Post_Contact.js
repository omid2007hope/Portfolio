const express = require("express");

const router = express.Router();

const contactController = require("../../../controller/ContactController");
const asyncHandler = require("../../../utils/asyncHandler");
const {
  ensureBodyObject,
  validateContactSubmission,
} = require("../../../middleware/validation");

router.post(
  "/contact",
  ensureBodyObject,
  validateContactSubmission,
  asyncHandler(contactController.createContactSubmission),
);

module.exports = router;
