const express = require("express");

const router = express.Router();

const projectController = require("../../../controller/ProjectController");
const asyncHandler = require("../../../utils/asyncHandler");

router.delete("/projects/:id", asyncHandler(projectController.deleteProject));

module.exports = router;
