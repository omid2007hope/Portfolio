const express = require("express");

const getMagazineRoutes = require("./Get_Magazine");
const postMagazineRoutes = require("./Post_Magazine");

const router = express.Router();

router.use(getMagazineRoutes);
router.use(postMagazineRoutes);

module.exports = router;
