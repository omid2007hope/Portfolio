const express = require("express");

const getProjectRoutes = require("./Get_Project");
const postProjectRoutes = require("./Post_Project");
const patchProjectRoutes = require("./Patch_Project");
const deleteProjectRoutes = require("./Delete_Project");

const router = express.Router();

router.use(getProjectRoutes);
router.use(postProjectRoutes);
router.use(patchProjectRoutes);
router.use(deleteProjectRoutes);

module.exports = router;
