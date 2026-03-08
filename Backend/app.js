const express = require("express");
const router = require("./routes");
const dotenv = require("dotenv");

dotenv.config({ path: ".env.local" });

const app = express();

app.use((req, res, next) => {
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
});

app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true }));

app.use("/api", router);

app.get("/", (_req, res) => {
  res.status(200).json({
    message: "Portfolio Prime API",
    uptime: process.uptime(),
    env: process.env.NODE_ENV || "development",
  });
});

app.use((_req, res) => {
  res.status(404).json({ error: "Not Found" });
});

app.use((err, _req, res, _next) => {
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

  res.status(500).json({ error: err.message || "Internal Server Error" });
});

module.exports = app;
