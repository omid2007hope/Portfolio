const BaseService = require("./BaseService");
const ReplyModel = require("../model/version_1/Replys");

const VALID_SCOPES = new Set(["group", "magazine", "qanda"]);

const normalizeScope = (scope) => {
  const normalized = String(scope || "group")
    .trim()
    .toLowerCase();
  return VALID_SCOPES.has(normalized) ? normalized : "group";
};

const normalizeTargetId = (targetId) => String(targetId || "global").trim();

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

    if (filters.userId) {
      condition.id = String(filters.userId).trim();
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
    const reply = await this.model.findById(replyId);
    if (!reply) return null;

    const hasLiked = reply.likes.includes(userId);
    const update = hasLiked
      ? { $pull: { likes: userId } }
      : { $addToSet: { likes: userId }, $pull: { dislikes: userId } };

    const updated = await this.update({ _id: replyId }, update);
    return this._serializeReply(updated);
  };

  toggleDislike = async (replyId, userId) => {
    const reply = await this.model.findById(replyId);
    if (!reply) return null;

    const hasDisliked = reply.dislikes.includes(userId);
    const update = hasDisliked
      ? { $pull: { dislikes: userId } }
      : { $addToSet: { dislikes: userId }, $pull: { likes: userId } };

    const updated = await this.update({ _id: replyId }, update);
    return this._serializeReply(updated);
  };
})(ReplyModel);
