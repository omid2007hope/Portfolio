const express = require("express");

const router = express.Router();

const projectController = require("../../../controller/ProjectController");
const asyncHandler = require("../../../utils/asyncHandler");
const { ensureBodyObject } = require("../../../middleware/validation");

router.post(
  "/projects",
  ensureBodyObject,
  asyncHandler(projectController.createProject),
);

module.exports = router;
