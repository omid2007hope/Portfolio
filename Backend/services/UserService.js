const BaseService = require("./BaseService");
const UserModel = require("../model/version_1/user");

module.exports = new (class UserService extends BaseService {
  _serializeUser = (user) => ({
    id: String(user._id),
    userId: user.id,
    name: user.name,
    email: user.email || "",
    isEmailVerified: Boolean(user.isEmailVerified),
    authTokenVersion: Number(user.authTokenVersion || 1),
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  });

  postUser = async (user) => {
    const newUser = await this.createObject({ id: user.id, name: user.name });
    return this._serializeUser(newUser);
  };

  getUser = async () => {
    const users = await this.model
      .find(this._active({}))
      .sort({ id: 1, createdAt: -1 })
      .lean();

    return users.map(this._serializeUser);
  };

  getUserByPublicId = async (userId) => {
    if (!userId) {
      return null;
    }

    const user = await this.model.findOne(this._active({ id: String(userId).trim() })).lean();
    return user ? this._serializeUser(user) : null;
  };
})(UserModel);
