const { createHttpError } = require("../../utils/httpError");
const {
  normalizeScope,
  normalizeTargetId,
  normalizeUserId,
} = require("../../utils/chatContext");

const ensureBodyObject = (req, _res, next) => {
  if (!req.body || typeof req.body !== "object" || Array.isArray(req.body)) {
    return next(createHttpError(400, "Request body must be a JSON object."));
  }

  return next();
};

const requireTrimmedString = (value) =>
  typeof value === "string" && value.trim().length > 0;

const toTrimmedOrEmpty = (value) =>
  typeof value === "string" ? value.trim() : "";

const validateContactSubmission = (req, _res, next) => {
  const { name, email, subject, message } = req.body;

  if (![name, email, subject, message].every(requireTrimmedString)) {
    return next(
      createHttpError(400, "name, email, subject, and message are required."),
    );
  }

  if (!email.includes("@")) {
    return next(createHttpError(400, "A valid email address is required."));
  }

  req.body = {
    ...req.body,
    name: name.trim(),
    email: email.trim().toLowerCase(),
    subject: subject.trim(),
    message: message.trim(),
    source: requireTrimmedString(req.body.source)
      ? req.body.source.trim()
      : "portfolio-contact-form",
  };

  return next();
};

const validateChatMessage = (req, _res, next) => {
  const { message, sessionId } = req.body;

  if (!requireTrimmedString(message)) {
    return next(createHttpError(400, "message is required."));
  }

  req.body = {
    ...req.body,
    message: message.trim(),
    ...(requireTrimmedString(sessionId) ? { sessionId: sessionId.trim() } : {}),
  };

  return next();
};

const validateUserPayload = (req, _res, next) => {
  const { id, name } = req.body;

  if (![id, name].every(requireTrimmedString)) {
    return next(createHttpError(400, "id and name are required."));
  }

  req.body = {
    ...req.body,
    id: id.trim(),
    name: name.trim(),
  };

  return next();
};

const validateMessagePayload = (req, _res, next) => {
  const { id, message } = req.body;

  if (![id, message].every(requireTrimmedString)) {
    return next(createHttpError(400, "id and message are required."));
  }

  req.body = {
    ...req.body,
    id: id.trim(),
    userName: toTrimmedOrEmpty(req.body.userName),
    scope: normalizeScope(req.body.scope),
    targetId: normalizeTargetId(req.body.targetId),
    message: message.trim(),
  };

  return next();
};

const validateReplyPayload = (req, _res, next) => {
  const { id, messageId, message } = req.body;

  if (![id, messageId, message].every(requireTrimmedString)) {
    return next(
      createHttpError(400, "id, messageId, and message are required."),
    );
  }

  req.body = {
    ...req.body,
    id: id.trim(),
    userName: toTrimmedOrEmpty(req.body.userName),
    messageId: messageId.trim(),
    scope: normalizeScope(req.body.scope),
    targetId: normalizeTargetId(req.body.targetId),
    message: message.trim(),
  };

  return next();
};

const validateReactionPayload = (req, _res, next) => {
  const normalizedUserId = normalizeUserId(req.body?.userId);

  if (!normalizedUserId) {
    return next(createHttpError(400, "userId is required."));
  }

  req.body = {
    ...req.body,
    userId: normalizedUserId,
  };

  return next();
};

module.exports = {
  ensureBodyObject,
  validateChatMessage,
  validateContactSubmission,
  validateMessagePayload,
  validateReactionPayload,
  validateReplyPayload,
  validateUserPayload,
};
