const express = require("express");

const router = express.Router();

const projectController = require("../../../controller/ProjectController");
const asyncHandler = require("../../../utils/asyncHandler");
const { ensureBodyObject } = require("../../../middleware/validation");

router.patch(
  "/projects/:id",
  ensureBodyObject,
  asyncHandler(projectController.updateProject),
);

module.exports = router;
