const express = require("express");

const profileRoutes = require("./Profile");
const projectRoutes = require("./Projects");
const resumeRoutes = require("./Resume");
const contactRoutes = require("./Contact");
const uploadRoutes = require("./upload");

const router = express.Router();

[
  profileRoutes,
  projectRoutes,
  resumeRoutes,
  contactRoutes,
  uploadRoutes,
].forEach((featureRouter) => {
  router.use(featureRouter);
});

module.exports = router;
