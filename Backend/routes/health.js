const express = require("express");

const router = express.Router();

router.get("/", (_req, res) => {
  res.status(200).json({
    message: "Portfolio Prime API",
    uptime: process.uptime(),
    env: process.env.NODE_ENV || "development",
  });
});

router.get("/server", (_req, res) => {
  res.status(200).send("server is running");
});

module.exports = router;
