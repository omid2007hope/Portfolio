const express = require("express");

const router = express.Router();

const resumeController = require("../../../controller/ResumeController");

router.patch(
  "/resumes/:id",
  ensureBodyObject,
  asyncHandler(resumeController.updateResume),
);

module.exports = router;
