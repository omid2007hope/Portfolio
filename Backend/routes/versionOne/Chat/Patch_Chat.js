const express = require("express");

const router = express.Router();

const chatController = require("../../../controller/ChatController");
const asyncHandler = require("../../../utils/asyncHandler");
const {
  ensureBodyObject,
} = require("../../../middleware/validation/requestValidators");

router.patch(
  "/chat/:sessionId",
  ensureBodyObject,
  asyncHandler(chatController.updateConversation),
);

module.exports = router;
