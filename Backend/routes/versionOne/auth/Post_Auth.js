const express = require("express");

const router = express.Router();

const authController = require("../../../controller/AuthController");
const asyncHandler = require("../../../utils/asyncHandler");
const {
  ensureBodyObject,
  validateAuthCodeRequestPayload,
  validateAuthCodeVerifyPayload,
} = require("../../../middleware/validation/requestValidators");

router.post(
  "/auth/request-code",
  ensureBodyObject,
  validateAuthCodeRequestPayload,
  asyncHandler(authController.requestLoginCode),
);

router.post(
  "/auth/verify-code",
  ensureBodyObject,
  validateAuthCodeVerifyPayload,
  asyncHandler(authController.verifyLoginCode),
);

module.exports = router;
