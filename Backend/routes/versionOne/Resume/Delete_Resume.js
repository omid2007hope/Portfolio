const express = require("express");

const router = express.Router();

const resumeController = require("../../../controller/ResumeController");

router.delete("/resumes/:id", asyncHandler(resumeController.deleteResume));

module.exports = router;
