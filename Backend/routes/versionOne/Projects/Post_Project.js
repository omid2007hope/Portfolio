const express = require("express");

const router = express.Router();

const projectController = require("../../../controller/ProjectController");

router.post(
  "/projects",
  ensureBodyObject,
  asyncHandler(projectController.createProject),
);

module.exports = router;
