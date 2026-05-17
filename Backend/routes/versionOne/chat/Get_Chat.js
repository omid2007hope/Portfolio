const express = require("express");

const router = express.Router();

const userController = require("../../../controller/UserController");
const messageController = require("../../../controller/MessageController");
const replyController = require("../../../controller/ReplyController");
const asyncHandler = require("../../../utils/asyncHandler");

router.get("/users", asyncHandler(userController.getUser));

router.get("/messages", asyncHandler(messageController.getMessages));
router.get(
  "/messages/user/:userId",
  asyncHandler(messageController.getMessagesByUser),
);

router.get("/replies", asyncHandler(replyController.getReplies));
router.get(
  "/replies/user/:userId",
  asyncHandler(replyController.getRepliesByUser),
);
router.get(
  "/replies/message/:messageId",
  asyncHandler(replyController.getRepliesByMessage),
);

module.exports = router;
