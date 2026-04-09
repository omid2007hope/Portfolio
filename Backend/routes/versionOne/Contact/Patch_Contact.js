const express = require("express");

const router = express.Router();

const contactController = require("../../../controller/ContactController");
const asyncHandler = require("../../../utils/asyncHandler");
const {
  ensureBodyObject,
} = require("../../../middleware/validation/requestValidators");

router.patch(
  "/contacts/:id",
  ensureBodyObject,
  asyncHandler(contactController.updateContactSubmission),
);

module.exports = router;
