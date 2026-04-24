const express = require("express");
const healthRoutes = require("./health");
const versionOneRoutes = require("./versionOne");

const router = express.Router();

// Health endpoints available at both /api/... and /api/v1/...
router.use(healthRoutes);
router.use("/v1", healthRoutes);

// Resource endpoints available at both /api/v1/... and /api/... for backwards compatibility.
router.use("/v1", versionOneRoutes);
router.use(versionOneRoutes);

module.exports = router;
