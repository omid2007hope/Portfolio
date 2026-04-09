const express = require("express");

const getContactRoutes = require("./Get_Contact");
const postContactRoutes = require("./Post_Contact");
const patchContactRoutes = require("./Patch_Contact");
const deleteContactRoutes = require("./Delete_Contact");

const router = express.Router();

router.use(getContactRoutes);
router.use(postContactRoutes);
router.use(patchContactRoutes);
router.use(deleteContactRoutes);

module.exports = router;
