const authService = require("../services/AuthService");

const requestLoginCode = async (req, res) => {
  const response = await authService.requestLoginCode(req.body?.email);
  return res.status(200).json(response);
};

const verifyLoginCode = async (req, res) => {
  const response = await authService.verifyLoginCode({
    email: req.body?.email,
    code: req.body?.code,
  });

  return res.status(200).json(response);
};

module.exports = {
  requestLoginCode,
  verifyLoginCode,
};
