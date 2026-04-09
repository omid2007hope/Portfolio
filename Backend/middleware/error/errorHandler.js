const errorHandler = (err, _req, res, _next) => {
  console.error(err);

  if (res.headersSent) {
    return;
  }

  if (err.status) {
    return res.status(err.status).json({
      error: err.message,
      ...(err.details !== undefined ? { details: err.details } : {}),
    });
  }

  if (err.name === "ValidationError") {
    return res.status(400).json({
      error: "Validation failed.",
      details: Object.values(err.errors).map((item) => item.message),
    });
  }

  if (err.name === "CastError") {
    return res.status(400).json({ error: "Invalid identifier format." });
  }

  if (err.code === 11000) {
    return res.status(409).json({
      error: "A record with the same unique field already exists.",
      details: err.keyValue,
    });
  }

  return res.status(500).json({ error: err.message || "Internal Server Error" });
};

module.exports = errorHandler;
