const messageService = require("../services/MessageService");

const getMessages = async (req, res) => {
  const response = await messageService.getMessages({
    userId: req.query.userId,
    scope: req.query.scope,
    targetId: req.query.targetId,
  });
  return res.status(200).json(response);
};

const getMessagesByUser = async (req, res) => {
  const response = await messageService.getMessagesByUser(req.params.userId);
  return res.status(200).json(response);
};

const postMessage = async (req, res) => {
  if (!req.body?.id || !req.body?.message) {
    return res.status(400).json({ error: "id and message are required." });
  }

  const response = await messageService.postMessage(req.body || {});
  return res.status(201).json(response);
};

const toggleMessageLike = async (req, res) => {
  if (!req.body?.userId) {
    return res.status(400).json({ error: "userId is required." });
  }

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
  if (!req.body?.userId) {
    return res.status(400).json({ error: "userId is required." });
  }

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
