const userService = require("../services/UserService");

const getUser = async (req, res) => {
  const response = await userService.getUser();
  return res.status(200).json(response);
};

const postUser = async (req, res) => {
  const response = await userService.postUser(req.body || {});
  return res.status(201).json(response);
};

module.exports = {
  getUser,
  postUser,
};
