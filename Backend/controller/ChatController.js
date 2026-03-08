const chatConversationService = require("../services/ChatConversationService");

const listConversations = async (req, res) => {
  const conversations = await chatConversationService.listConversations({
    status: req.query.status || undefined,
  });

  return res.status(200).json(conversations);
};

const sendMessage = async (req, res) => {
  const { sessionId, message } = req.body || {};

  const payload = await chatConversationService.createOrAppendMessage({
    sessionId,
    message,
  });

  return res.status(200).json(payload);
};

const getConversation = async (req, res) => {
  const conversation = await chatConversationService.getConversation(
    req.params.sessionId,
  );

  if (!conversation) {
    return res.status(404).json({ error: "Conversation not found." });
  }

  return res.status(200).json(conversation);
};

const updateConversation = async (req, res) => {
  const conversation = await chatConversationService.updateConversation(
    req.params.sessionId,
    req.body || {},
  );

  if (!conversation) {
    return res.status(404).json({ error: "Conversation not found." });
  }

  return res.status(200).json(conversation);
};

const deleteConversation = async (req, res) => {
  const conversation = await chatConversationService.deleteConversation(
    req.params.sessionId,
  );

  if (!conversation) {
    return res.status(404).json({ error: "Conversation not found." });
  }

  return res.status(200).json({
    message: "Conversation deleted successfully.",
    conversation,
  });
};

module.exports = {
  deleteConversation,
  getConversation,
  listConversations,
  sendMessage,
  updateConversation,
};
