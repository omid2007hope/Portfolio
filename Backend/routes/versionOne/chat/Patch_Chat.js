const express = require("express");

const router = express.Router();

const messageController = require("../../../controller/MessageController");
const replyController = require("../../../controller/ReplyController");
const asyncHandler = require("../../../utils/asyncHandler");
const {
  ensureBodyObject,
  validateReactionPayload,
} = require("../../../middleware/validation/requestValidators");

router.patch(
  "/messages/:messageId/like",
  ensureBodyObject,
  validateReactionPayload,
  asyncHandler(messageController.toggleMessageLike),
);
router.patch(
  "/messages/:messageId/dislike",
  ensureBodyObject,
  validateReactionPayload,
  asyncHandler(messageController.toggleMessageDislike),
);

router.patch(
  "/replies/:replyId/like",
  ensureBodyObject,
  validateReactionPayload,
  asyncHandler(replyController.toggleReplyLike),
);
router.patch(
  "/replies/:replyId/dislike",
  ensureBodyObject,
  validateReactionPayload,
  asyncHandler(replyController.toggleReplyDislike),
);

module.exports = router;
