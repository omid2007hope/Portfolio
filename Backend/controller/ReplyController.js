const replyService = require("../services/ReplyService");

const getReplies = async (req, res) => {
  const response = await replyService.getReplies({
    userId: req.query.userId,
    messageId: req.query.messageId,
    scope: req.query.scope,
    targetId: req.query.targetId,
    limit: req.query.limit,
  });
  return res.status(200).json(response);
};

const getRepliesByMessage = async (req, res) => {
  const response = await replyService.getRepliesByMessage(req.params.messageId);
  return res.status(200).json(response);
};

const getRepliesByUser = async (req, res) => {
  const response = await replyService.getRepliesByUser(req.params.userId);
  return res.status(200).json(response);
};

const postReply = async (req, res) => {
  const response = await replyService.postReply({
    ...(req.body || {}),
    id: req.auth?.userId || req.body?.id,
  });
  return res.status(201).json(response);
};

const toggleReplyLike = async (req, res) => {
  const response = await replyService.toggleLike(
    req.params.replyId,
    req.body?.userId,
  );

  if (!response) {
    return res.status(404).json({ error: "Reply not found." });
  }

  return res.status(200).json(response);
};

const toggleReplyDislike = async (req, res) => {
  const response = await replyService.toggleDislike(
    req.params.replyId,
    req.body?.userId,
  );

  if (!response) {
    return res.status(404).json({ error: "Reply not found." });
  }

  return res.status(200).json(response);
};

module.exports = {
  getReplies,
  getRepliesByMessage,
  getRepliesByUser,
  postReply,
  toggleReplyDislike,
  toggleReplyLike,
};
