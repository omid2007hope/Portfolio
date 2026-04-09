const express = require("express");

const router = express.Router();

const chatController = require("../../../controller/ChatController");
const asyncHandler = require("../../../utils/asyncHandler");

router.get("/chats", asyncHandler(chatController.listConversations));
router.get("/chat/:sessionId", asyncHandler(chatController.getConversation));

module.exports = router;
