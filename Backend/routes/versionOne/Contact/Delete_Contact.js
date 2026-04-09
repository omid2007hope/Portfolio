const express = require("express");

const router = express.Router();

const contactController = require("../../../controller/ContactController");
const asyncHandler = require("../../../utils/asyncHandler");

router.delete(
  "/contacts/:id",
  asyncHandler(contactController.deleteContactSubmission),
);

module.exports = router;
