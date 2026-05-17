const BaseService = require("./BaseService");
const ReplyModel = require("../model/version_1/Replys");

module.exports = new (class ReplyService extends BaseService {
  _serializeReply = (reply) => ({
    id: String(reply._id),
    userId: reply.id,
    message: reply.message,
    likes: reply.likes || [],
    dislikes: reply.dislikes || [],
    createdAt: reply.createdAt,
    updatedAt: reply.updatedAt,
  });

  postReply = async (data) => {
    const newReply = await this.createObject({
      id: data.id,
      message: data.message,
    });
    return this._serializeReply(newReply);
  };

  getReplies = async () => {
    const replies = await this.model
      .find(this._active({}))
      .sort({ createdAt: -1 })
      .lean();

    return replies.map(this._serializeReply);
  };

  getRepliesByUser = async (userId) => {
    const replies = await this.model
      .find(this._active({ id: userId }))
      .sort({ createdAt: -1 })
      .lean();

    return replies.map(this._serializeReply);
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
