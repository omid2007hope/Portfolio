const BaseService = require("./BaseService");
const MessageModel = require("../model/version_1/message");
const {
  normalizeFeedLimit,
  normalizeScope,
  normalizeTargetId,
  normalizeUserId,
} = require("../utils/chatContext");

module.exports = new (class MessageService extends BaseService {
  _buildAnonymousLabelMap = async (scope, targetId) => {
    const normalizedScope = normalizeScope(scope);
    const normalizedTargetId = normalizeTargetId(targetId);

    const [messages, replies] = await Promise.all([
      this.model
        .find(
          this._active({
            scope: normalizedScope,
            targetId: normalizedTargetId,
          }),
        )
        .sort({ createdAt: 1 })
        .select({ id: 1, createdAt: 1 })
        .lean(),
      require("../model/version_1/Replys")
        .find({
          isDeleted: { $ne: true },
          scope: normalizedScope,
          targetId: normalizedTargetId,
        })
        .sort({ createdAt: 1 })
        .select({ id: 1, createdAt: 1 })
        .lean(),
    ]);

    const ordered = [...messages, ...replies].sort(
      (a, b) => new Date(a.createdAt) - new Date(b.createdAt),
    );

    const labelByUserId = new Map();
    let counter = 0;

    ordered.forEach((entry) => {
      const userId = String(entry.id || "").trim();
      if (!userId || labelByUserId.has(userId)) {
        return;
      }

      counter += 1;
      labelByUserId.set(userId, `Anonymous ${counter}`);
    });

    return labelByUserId;
  };

  _resolveAnonymousLabel = async (scope, targetId, userId) => {
    const labelMap = await this._buildAnonymousLabelMap(scope, targetId);
    const normalizedUserId = normalizeUserId(userId);

    if (labelMap.has(normalizedUserId)) {
      return labelMap.get(normalizedUserId);
    }

    return `Anonymous ${labelMap.size + 1}`;
  };

  _serializeMessage = (message) => ({
    id: String(message._id),
    userId: message.id,
    userName: message.userName || "Anonymous",
    scope: message.scope || "group",
    targetId: message.targetId || "global",
    message: message.message,
    likes: message.likes || [],
    dislikes: message.dislikes || [],
    createdAt: message.createdAt,
    updatedAt: message.updatedAt,
  });

  postMessage = async (data) => {
    const normalizedScope = normalizeScope(data.scope);
    const normalizedTargetId = normalizeTargetId(data.targetId);
    const normalizedUserId = normalizeUserId(data.id);
    const userName = await this._resolveAnonymousLabel(
      normalizedScope,
      normalizedTargetId,
      normalizedUserId,
    );

    const newMessage = await this.createObject({
      id: normalizedUserId,
      userName,
      scope: normalizedScope,
      targetId: normalizedTargetId,
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
