const express = require("express");

const router = express.Router();

const resumeController = require("../../../controller/ResumeController");
const asyncHandler = require("../../../utils/asyncHandler");
const { ensureBodyObject } = require("../../../middleware/validation");

router.post(
  "/resumes",
  ensureBodyObject,
  asyncHandler(resumeController.createResume),
);

module.exports = router;
