const express = require("express");

const profileRoutes = require("./profile");
const projectRoutes = require("./projects");
const resumeRoutes = require("./resume");
const contactRoutes = require("./contact");

const router = express.Router();

[profileRoutes, projectRoutes, resumeRoutes, contactRoutes].forEach(
  (featureRouter) => {
    router.use(featureRouter);
  },
);

module.exports = router;
