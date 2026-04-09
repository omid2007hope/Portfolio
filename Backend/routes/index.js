const express = require("express");
const versionOneRoutes = require("./versionOne");

const router = express.Router();

router.get("/server", (_req, res) => {
  res.status(200).send("server is running");
});

router.use(versionOneRoutes);
router.use("/v1", versionOneRoutes);

module.exports = router;
