const express = require("express");

const postAuthRoutes = require("./Post_Auth");

const router = express.Router();

router.use(postAuthRoutes);

module.exports = router;
