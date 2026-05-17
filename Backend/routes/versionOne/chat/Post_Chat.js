const express = require("express");

const router = express.Router();

const userController = require("../../../controller/UserController");
const messageController = require("../../../controller/MessageController");
const replyController = require("../../../controller/ReplyController");
const asyncHandler = require("../../../utils/asyncHandler");
const {
  ensureBodyObject,
} = require("../../../middleware/validation/requestValidators");

router.post("/users", ensureBodyObject, asyncHandler(userController.postUser));
router.post(
  "/messages",
  ensureBodyObject,
  asyncHandler(messageController.postMessage),
);
router.post(
  "/replies",
  ensureBodyObject,
  asyncHandler(replyController.postReply),
);

module.exports = router;
