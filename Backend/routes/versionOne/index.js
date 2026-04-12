const express = require("express");

const profileRoutes = require("./profile");
const projectRoutes = require("./projects");
const resumeRoutes = require("./resume");
const contactRoutes = require("./contact");
const chatRoutes = require("./chat");

const router = express.Router();

[
  profileRoutes,
  projectRoutes,
  resumeRoutes,
  contactRoutes,
  chatRoutes,
].forEach((featureRouter) => {
  router.use(featureRouter);
});

module.exports = router;
