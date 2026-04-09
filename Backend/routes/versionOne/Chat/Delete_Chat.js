const express = require("express");

const router = express.Router();

const chatController = require("../../../controller/ChatController");
const asyncHandler = require("../../../utils/asyncHandler");

router.delete(
  "/chat/:sessionId",
  asyncHandler(chatController.deleteConversation),
);

module.exports = router;
