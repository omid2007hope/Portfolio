const { createHttpError } = require("../../utils/httpError");
const { decodeAuthToken } = require("../../utils/token");
const userService = require("../../services/UserService");

const extractBearerToken = (authorizationHeader) => {
  if (!authorizationHeader || typeof authorizationHeader !== "string") {
    return "";
  }

  const match = authorizationHeader.match(/^Bearer\s+(.+)$/i);
  return match ? match[1].trim() : "";
};

const requireAuth = async (req, _res, next) => {
  const token = extractBearerToken(req.headers?.authorization);

  if (!token) {
    return next(createHttpError(401, "Authentication required."));
  }

  const decoded = decodeAuthToken(token);
  if (!decoded) {
    return next(createHttpError(401, "Invalid or expired auth token."));
  }

  const user = await userService.getUserByPublicId(decoded.userId);

  if (!user || !user.isEmailVerified) {
    return next(createHttpError(401, "Verified account required."));
  }

  if (
    Number(user.authTokenVersion || 1) !== Number(decoded.tokenVersion || 1)
  ) {
    return next(createHttpError(401, "Auth token is no longer valid."));
  }

  req.auth = {
    userId: user.userId,
    name: user.name,
    email: user.email,
  };

  return next();
};

module.exports = requireAuth;
