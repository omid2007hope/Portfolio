const BaseService = require("./BaseService");
const ReplyModel = require("../model/version_1/Replys");
const {
  normalizeFeedLimit,
  normalizeScope,
  normalizeTargetId,
  normalizeUserId,
} = require("../utils/chatContext");
const MessageModel = require("../model/version_1/message");

module.exports = new (class ReplyService extends BaseService {
  _buildAnonymousLabelMap = async (scope, targetId) => {
    const normalizedScope = normalizeScope(scope);
    const normalizedTargetId = normalizeTargetId(targetId);

    const [messages, replies] = await Promise.all([
      MessageModel.find({
        isDeleted: { $ne: true },
        scope: normalizedScope,
        targetId: normalizedTargetId,
      })
        .sort({ createdAt: 1 })
        .select({ id: 1, createdAt: 1 })
        .lean(),
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

  _serializeReply = (reply) => ({
    id: String(reply._id),
    userId: reply.id,
    userName: reply.userName || "Anonymous",
    messageId: reply.messageId,
    scope: reply.scope || "group",
    targetId: reply.targetId || "global",
    message: reply.message,
    likes: reply.likes || [],
    dislikes: reply.dislikes || [],
    createdAt: reply.createdAt,
    updatedAt: reply.updatedAt,
  });

  postReply = async (data) => {
    const normalizedScope = normalizeScope(data.scope);
    const normalizedTargetId = normalizeTargetId(data.targetId);
    const normalizedUserId = normalizeUserId(data.id);
    const userName = await this._resolveAnonymousLabel(
      normalizedScope,
      normalizedTargetId,
      normalizedUserId,
    );

    const newReply = await this.createObject({
      id: normalizedUserId,
      userName,
      messageId: data.messageId,
      scope: normalizedScope,
      targetId: normalizedTargetId,
      message: data.message,
    });
    return this._serializeReply(newReply);
  };

  getReplies = async (filters = {}) => {
    const condition = this._active({});
    const limit = normalizeFeedLimit(filters.limit);

    if (filters.userId) {
      condition.id = normalizeUserId(filters.userId);
    }

    if (filters.messageId) {
      condition.messageId = String(filters.messageId).trim();
    }

    if (filters.scope) {
      condition.scope = normalizeScope(filters.scope);
    }

    if (filters.targetId) {
      condition.targetId = normalizeTargetId(filters.targetId);
    }

    const replies = await this.model
      .find(condition)
      .sort({ createdAt: -1 })
      .limit(limit)
      .lean();

    return replies.map(this._serializeReply);
  };

  getRepliesByUser = async (userId) => {
    return this.getReplies({ userId });
  };

  getRepliesByMessage = async (messageId) => {
    return this.getReplies({ messageId });
  };

  toggleLike = async (replyId, userId) => {
    const normalizedUserId = normalizeUserId(userId);
    const reply = await this.model.findById(replyId);
    if (!reply) return null;

    const hasLiked = reply.likes.includes(normalizedUserId);
    const update = hasLiked
      ? { $pull: { likes: normalizedUserId } }
      : {
          $addToSet: { likes: normalizedUserId },
          $pull: { dislikes: normalizedUserId },
        };

    const updated = await this.update({ _id: replyId }, update);
    return this._serializeReply(updated);
  };

  toggleDislike = async (replyId, userId) => {
    const normalizedUserId = normalizeUserId(userId);
    const reply = await this.model.findById(replyId);
    if (!reply) return null;

    const hasDisliked = reply.dislikes.includes(normalizedUserId);
    const update = hasDisliked
      ? { $pull: { dislikes: normalizedUserId } }
      : {
          $addToSet: { dislikes: normalizedUserId },
          $pull: { likes: normalizedUserId },
        };

    const updated = await this.update({ _id: replyId }, update);
    return this._serializeReply(updated);
  };
})(ReplyModel);
