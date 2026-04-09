const express = require("express");

const router = express.Router();

const profileController = require("../../../controller/ProfileController");

router.post(
  "/profiles",
  ensureBodyObject,
  asyncHandler(profileController.createProfile),
);

module.exports = router;
