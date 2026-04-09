const applyCorsHeaders = (req, res, next) => {
  const allowedOrigin = process.env.CORS_ORIGIN || "*";

  res.header("Access-Control-Allow-Origin", allowedOrigin);
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization",
  );
  res.header("Access-Control-Allow-Methods", "GET,POST,PATCH,PUT,DELETE,OPTIONS");

  if (req.method === "OPTIONS") {
    return res.sendStatus(204);
  }

  return next();
};

module.exports = {
  applyCorsHeaders,
};
