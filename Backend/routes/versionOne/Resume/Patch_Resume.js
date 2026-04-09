const express = require("express");

const router = express.Router();

const resumeController = require("../../../controller/ResumeController");
const asyncHandler = require("../../../utils/asyncHandler");
const { ensureBodyObject } = require("../../../middleware/validation");

router.patch(
  "/resumes/:id",
  ensureBodyObject,
  asyncHandler(resumeController.updateResume),
);

module.exports = router;
