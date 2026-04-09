const express = require("express");

const profileRoutes = require("./Profile");
const projectRoutes = require("./Projects");
const resumeRoutes = require("./Resume");
const contactRoutes = require("./Contact");
const chatRoutes = require("./Chat");

const router = express.Router();

router.use(profileRoutes);
router.use(projectRoutes);
router.use(resumeRoutes);
router.use(contactRoutes);
router.use(chatRoutes);

module.exports = router;
