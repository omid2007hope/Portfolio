const BaseService = require("./BaseService");
const MessageModel = require("../model/version_1/message");

module.exports = new (class MessageService extends BaseService {
  _serializeMessage = (message) => ({
    id: String(message._id),
    userId: message.id,
    message: message.message,
    likes: message.likes || [],
    dislikes: message.dislikes || [],
    createdAt: message.createdAt,
    updatedAt: message.updatedAt,
  });

  postMessage = async (data) => {
    const newMessage = await this.createObject({
      id: data.id,
      message: data.message,
    });
    return this._serializeMessage(newMessage);
  };

  getMessages = async () => {
    const messages = await this.model
      .find(this._active({}))
      .sort({ createdAt: -1 })
      .lean();

    return messages.map(this._serializeMessage);
  };

  getMessagesByUser = async (userId) => {
    const messages = await this.model
      .find(this._active({ id: userId }))
      .sort({ createdAt: -1 })
      .lean();

    return messages.map(this._serializeMessage);
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
