const messageService = require("../services/MessageService");

const getMessages = async (req, res) => {
  const response = await messageService.getMessages({
    userId: req.query.userId,
    scope: req.query.scope,
    targetId: req.query.targetId,
    limit: req.query.limit,
  });
  return res.status(200).json(response);
};

const getMessagesByUser = async (req, res) => {
  const response = await messageService.getMessagesByUser(req.params.userId);
  return res.status(200).json(response);
};

const postMessage = async (req, res) => {
  const response = await messageService.postMessage(req.body || {});
  return res.status(201).json(response);
};

const toggleMessageLike = async (req, res) => {
  const response = await messageService.toggleLike(
    req.params.messageId,
    req.body?.userId,
  );

  if (!response) {
    return res.status(404).json({ error: "Message not found." });
  }

  return res.status(200).json(response);
};

const toggleMessageDislike = async (req, res) => {
  const response = await messageService.toggleDislike(
    req.params.messageId,
    req.body?.userId,
  );

  if (!response) {
    return res.status(404).json({ error: "Message not found." });
  }

  return res.status(200).json(response);
};

module.exports = {
  getMessages,
  getMessagesByUser,
  postMessage,
  toggleMessageDislike,
  toggleMessageLike,
};
