const express = require("express");

const getProfileRoutes = require("./Get_Profile");
const postProfileRoutes = require("./Post_Profile");
const patchProfileRoutes = require("./Patch_Profile");
const deleteProfileRoutes = require("./Delete_Profile");

const router = express.Router();

router.use(getProfileRoutes);
router.use(postProfileRoutes);
router.use(patchProfileRoutes);
router.use(deleteProfileRoutes);

module.exports = router;
