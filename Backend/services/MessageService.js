const BaseService = require("./BaseService");
const MessageModel = require("../model/version_1/message");

const VALID_SCOPES = new Set(["group", "magazine", "qanda"]);

const normalizeScope = (scope) => {
  const normalized = String(scope || "group")
    .trim()
    .toLowerCase();
  return VALID_SCOPES.has(normalized) ? normalized : "group";
};

const normalizeTargetId = (targetId) => String(targetId || "global").trim();

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

    if (filters.userId) {
      condition.id = String(filters.userId).trim();
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
      .lean();

    return messages.map(this._serializeMessage);
  };

  getMessagesByUser = async (userId) => {
    return this.getMessages({ userId });
  };

  toggleLike = async (messageId, userId) => {
    const message = await this.model.findById(messageId);
    if (!message) return null;

    const hasLiked = message.likes.includes(userId);
    const update = hasLiked
      ? { $pull: { likes: userId } }
      : { $addToSet: { likes: userId }, $pull: { dislikes: userId } };

    const updated = await this.update({ _id: messageId }, update);
    return this._serializeMessage(updated);
  };

  toggleDislike = async (messageId, userId) => {
    const message = await this.model.findById(messageId);
    if (!message) return null;

    const hasDisliked = message.dislikes.includes(userId);
    const update = hasDisliked
      ? { $pull: { dislikes: userId } }
      : { $addToSet: { dislikes: userId }, $pull: { likes: userId } };

    const updated = await this.update({ _id: messageId }, update);
    return this._serializeMessage(updated);
  };
})(MessageModel);
