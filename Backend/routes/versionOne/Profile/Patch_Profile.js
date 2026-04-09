const express = require("express");

const router = express.Router();

const profileController = require("../../../controller/ProfileController");
const asyncHandler = require("../../../utils/asyncHandler");
const { ensureBodyObject } = require("../../../middleware/validation");

router.patch(
  "/profiles/:id",
  ensureBodyObject,
  asyncHandler(profileController.updateProfile),
);

module.exports = router;
