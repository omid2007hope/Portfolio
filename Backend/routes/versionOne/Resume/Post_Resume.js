const express = require("express");

const router = express.Router();

const resumeController = require("../../../controller/ResumeController");

router.post(
  "/resumes",
  ensureBodyObject,
  asyncHandler(resumeController.createResume),
);

module.exports = router;
