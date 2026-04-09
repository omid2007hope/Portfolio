const express = require("express");

const router = express.Router();

const resumeController = require("../../../controller/ResumeController");
const asyncHandler = require("../../../utils/asyncHandler");

router.get("/resume", asyncHandler(resumeController.getResume));
router.get("/resumes", asyncHandler(resumeController.listResumes));
router.get("/resumes/:id", asyncHandler(resumeController.getResumeById));

module.exports = router;
