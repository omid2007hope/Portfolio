const BaseService = require("./BaseService");
const UserModel = require("../model/version_1/user");

module.exports = new (class UserService extends BaseService {
  _serializeUser = (user) => ({
    id: String(user._id),
    userId: user.id,
    name: user.name,
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
})(UserModel);
