const express = require("express");
const healthRoutes = require("./health");
const versionOneRoutes = require("./versionOne");

const router = express.Router();

router.use(healthRoutes);
router.use("/v1", healthRoutes);
router.use("/v1", versionOneRoutes);
router.use(versionOneRoutes);

module.exports = router;
