const BaseService = require("./BaseService");
const MessageModel = require("../model/version_1/message");
const {
  normalizeFeedLimit,
  normalizeScope,
  normalizeTargetId,
  normalizeUserId,
} = require("../utils/chatContext");

module.exports = new (class MessageService extends BaseService {
  _serializeMessage = (message) => ({
    id: String(message._id),
    userId: message.id,
    userName: message.userName || "",
    scope: message.scope || "group",
    targetId: message.targetId || "global",
    message: message.message,
    likes: message.likes || [],
    dislikes: message.dislikes || [],
    createdAt: message.createdAt,
    updatedAt: message.updatedAt,
  });

  postMessage = async (data) => {
    const newMessage = await this.createObject({
      id: data.id,
      userName: data.userName,
      scope: normalizeScope(data.scope),
      targetId: normalizeTargetId(data.targetId),
      message: data.message,
    });
    return this._serializeMessage(newMessage);
  };

  getMessages = async (filters = {}) => {
    const condition = this._active({});
    const limit = normalizeFeedLimit(filters.limit);

    if (filters.userId) {
      condition.id = normalizeUserId(filters.userId);
    }

    if (filters.scope) {
      condition.scope = normalizeScope(filters.scope);
    }

    if (filters.targetId) {
      condition.targetId = normalizeTargetId(filters.targetId);
    }

    const messages = await this.model
      .find(condition)
      .sort({ createdAt: -1 })
      .limit(limit)
      .lean();

    return messages.map(this._serializeMessage);
  };

  getMessagesByUser = async (userId) => {
    return this.getMessages({ userId });
  };

  toggleLike = async (messageId, userId) => {
    const normalizedUserId = normalizeUserId(userId);
    const message = await this.model.findById(messageId);
    if (!message) return null;

    const hasLiked = message.likes.includes(normalizedUserId);
    const update = hasLiked
      ? { $pull: { likes: normalizedUserId } }
      : {
          $addToSet: { likes: normalizedUserId },
          $pull: { dislikes: normalizedUserId },
        };

    const updated = await this.update({ _id: messageId }, update);
    return this._serializeMessage(updated);
  };

  toggleDislike = async (messageId, userId) => {
    const normalizedUserId = normalizeUserId(userId);
    const message = await this.model.findById(messageId);
    if (!message) return null;

    const hasDisliked = message.dislikes.includes(normalizedUserId);
    const update = hasDisliked
      ? { $pull: { dislikes: normalizedUserId } }
      : {
          $addToSet: { dislikes: normalizedUserId },
          $pull: { likes: normalizedUserId },
        };

    const updated = await this.update({ _id: messageId }, update);
    return this._serializeMessage(updated);
  };
})(MessageModel);
