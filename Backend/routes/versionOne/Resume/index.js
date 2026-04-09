const express = require("express");

const getResumeRoutes = require("./Get_Resume");
const postResumeRoutes = require("./Post_Resume");
const patchResumeRoutes = require("./Patch_Resume");
const deleteResumeRoutes = require("./Delete_Resume");

const router = express.Router();

router.use(getResumeRoutes);
router.use(postResumeRoutes);
router.use(patchResumeRoutes);
router.use(deleteResumeRoutes);

module.exports = router;
