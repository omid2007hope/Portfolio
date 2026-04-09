const express = require("express");

const router = express.Router();

const profileController = require("../../../controller/ProfileController");

router.get("/profile", asyncHandler(profileController.getProfile));
router.get("/portfolio/profile", asyncHandler(profileController.getProfile));
router.get("/profiles", asyncHandler(profileController.listProfiles));
router.get("/profiles/:id", asyncHandler(profileController.getProfileById));

module.exports = router;
s;
