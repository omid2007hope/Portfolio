const express = require("express");

const router = express.Router();

const magazineController = require("../../../controller/MagazineController");
const asyncHandler = require("../../../utils/asyncHandler");
const { upload } = require("../../../middleware/upload/uploadMiddleware");

router.post(
  "/magazine",
  upload.single("image"),
  asyncHandler(magazineController.postMagazineContent),
);

module.exports = router;
