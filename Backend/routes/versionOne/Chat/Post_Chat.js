const express = require("express");

const router = express.Router();

const chatController = require("../../../controller/ChatController");
const asyncHandler = require("../../../utils/asyncHandler");
const {
  ensureBodyObject,
  validateChatMessage,
} = require("../../../middleware/validation");

router.post(
  "/chat",
  ensureBodyObject,
  validateChatMessage,
  asyncHandler(chatController.sendMessage),
);

module.exports = router;
