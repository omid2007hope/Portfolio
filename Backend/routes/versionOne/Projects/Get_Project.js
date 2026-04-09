const express = require("express");

const router = express.Router();

const projectController = require("../../../controller/ProjectController");
const asyncHandler = require("../../../utils/asyncHandler");

router.get("/projects", asyncHandler(projectController.getProjects));
router.get(
  "/projects/:identifier",
  asyncHandler(projectController.getProjectByIdentifier),
);

module.exports = router;
