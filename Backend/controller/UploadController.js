/** @format */

const { cloudinary } = require("../config/cloudinary");

/**
 * POST /api/v1/upload
 * Body: multipart/form-data with field "image" (single file)
 * Returns: { url, publicId, width, height, format, bytes }
 */
const uploadImage = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No image file provided." });
  }

  return res.status(201).json({
    url: req.file.path,
    publicId: req.file.filename,
    width: req.file.width ?? null,
    height: req.file.height ?? null,
    format: req.file.format ?? null,
    bytes: req.file.size ?? null,
  });
};

/**
 * DELETE /api/v1/upload/:publicId
 * Deletes an image from Cloudinary by its public_id.
 * The publicId must be URL-encoded if it contains slashes.
 */

const deleteImage = async (req, res) => {
  const { publicId } = req.params;

  if (!publicId) {
    return res.status(400).json({ error: "publicId is required." });
  }

  const result = await cloudinary.uploader.destroy(publicId);

  if (result.result === "not found") {
    return res.status(404).json({ error: "Image not found on Cloudinary." });
  }

  return res
    .status(200)
    .json({ message: "Image deleted.", result: result.result });
};

module.exports = { deleteImage, uploadImage };
