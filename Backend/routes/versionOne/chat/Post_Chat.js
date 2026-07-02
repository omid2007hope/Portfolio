const express = require("express");

const router = express.Router();

const userController = require("../../../controller/UserController");
const messageController = require("../../../controller/MessageController");
const replyController = require("../../../controller/ReplyController");
const requireAuth = require("../../../middleware/auth/requireAuth");
const asyncHandler = require("../../../utils/asyncHandler");
const {
  ensureBodyObject,
  validateMessagePayload,
  validateReplyPayload,
  validateUserPayload,
} = require("../../../middleware/validation/requestValidators");

router.post(
  "/users",
  ensureBodyObject,
  validateUserPayload,
  asyncHandler(userController.postUser),
);
router.post(
  "/messages",
  asyncHandler(requireAuth),
  ensureBodyObject,
  validateMessagePayload,
  asyncHandler(messageController.postMessage),
);
router.post(
  "/replies",
  asyncHandler(requireAuth),
  ensureBodyObject,
  validateReplyPayload,
  asyncHandler(replyController.postReply),
);

module.exports = router;
