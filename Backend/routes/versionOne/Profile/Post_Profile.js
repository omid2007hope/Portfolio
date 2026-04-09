const express = require("express");

const router = express.Router();

const profileController = require("../../../controller/ProfileController");
const asyncHandler = require("../../../utils/asyncHandler");
const {
  ensureBodyObject,
} = require("../../../middleware/validation/requestValidators");

router.post(
  "/profiles",
  ensureBodyObject,
  asyncHandler(profileController.createProfile),
);

module.exports = router;
