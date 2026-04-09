const express = require("express");

const router = express.Router();

const profileController = require("../../../controller/ProfileController");

router.delete("/profiles/:id", asyncHandler(profileController.deleteProfile));

module.exports = router;
