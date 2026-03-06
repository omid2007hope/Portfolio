// © 2026 Omid Teimory. All rights reserved.
// Signature: OmidTeimory-2026
const express = require("express");
const router = require("./router");
const dotenv = require("dotenv");

// Load environment variables in development and staging.
dotenv.config({ path: ".env.local" });

const app = express();

app.use(express.json());
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
  res.status(500).json({ error: "Internal Server Error" });
});

module.exports = app;
