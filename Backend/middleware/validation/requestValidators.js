const { createHttpError } = require("../../utils/httpError");

const ensureBodyObject = (req, _res, next) => {
  if (!req.body || typeof req.body !== "object" || Array.isArray(req.body)) {
    return next(createHttpError(400, "Request body must be a JSON object."));
  }

  return next();
};

const requireTrimmedString = (value) =>
  typeof value === "string" && value.trim().length > 0;

const validateContactSubmission = (req, _res, next) => {
  const { name, email, subject, message } = req.body;

  if (![name, email, subject, message].every(requireTrimmedString)) {
    return next(
      createHttpError(
        400,
        "name, email, subject, and message are required.",
      ),
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
    ...(requireTrimmedString(sessionId)
      ? { sessionId: sessionId.trim() }
      : {}),
  };

  return next();
};

module.exports = {
  ensureBodyObject,
  validateChatMessage,
  validateContactSubmission,
};
