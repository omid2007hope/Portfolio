const BaseService = require("./BaseService");
const ReplyModel = require("../model/version_1/Replys");
const {
  normalizeFeedLimit,
  normalizeScope,
  normalizeTargetId,
  normalizeUserId,
} = require("../utils/chatContext");

module.exports = new (class ReplyService extends BaseService {
  _serializeReply = (reply) => ({
    id: String(reply._id),
    userId: reply.id,
    userName: reply.userName || "",
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
    const newReply = await this.createObject({
      id: data.id,
      userName: data.userName,
      messageId: data.messageId,
      scope: normalizeScope(data.scope),
      targetId: normalizeTargetId(data.targetId),
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
