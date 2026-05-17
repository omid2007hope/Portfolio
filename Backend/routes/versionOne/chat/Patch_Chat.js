const express = require("express");

const router = express.Router();

const messageController = require("../../../controller/MessageController");
const replyController = require("../../../controller/ReplyController");
const asyncHandler = require("../../../utils/asyncHandler");
const {
  ensureBodyObject,
} = require("../../../middleware/validation/requestValidators");

router.patch(
  "/messages/:messageId/like",
  ensureBodyObject,
  asyncHandler(messageController.toggleMessageLike),
);
router.patch(
  "/messages/:messageId/dislike",
  ensureBodyObject,
  asyncHandler(messageController.toggleMessageDislike),
);

router.patch(
  "/replies/:replyId/like",
  ensureBodyObject,
  asyncHandler(replyController.toggleReplyLike),
);
router.patch(
  "/replies/:replyId/dislike",
  ensureBodyObject,
  asyncHandler(replyController.toggleReplyDislike),
);

module.exports = router;
