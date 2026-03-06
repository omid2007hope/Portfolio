// © 2026 Omid Teimory. All rights reserved.
// Signature: OmidTeimory-2026
const express = require("express");
const router = express.Router();

// Health check for the API
router.get("/server", (req, res) => {
  return res.status(200).send("server is running");
});

module.exports = router;
