const express = require("express");

const router = express.Router();

const projectController = require("../../../controller/ProjectController");

router.patch(
  "/projects/:id",
  ensureBodyObject,
  asyncHandler(projectController.updateProject),
);

module.exports = router;
