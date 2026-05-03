/** @format */

const express = require("express");
const asyncHandler = require("../../../utils/asyncHandler");
const { upload } = require("../../../middleware/upload/uploadMiddleware");
const {
  deleteImage,
  uploadImage,
} = require("../../../controller/UploadController");

const router = express.Router();

// POST /api/v1/upload  — send form-data with field name "image"
router.post("/upload", upload.single("image"), asyncHandler(uploadImage));

// DELETE /api/v1/upload/:publicId — publicId is URL-encoded (e.g. portfolio%2Fmy-image)
router.delete("/upload/:publicId", asyncHandler(deleteImage));

module.exports = router;
