const express = require("express");

const router = express.Router();

const magazineController = require("../../../controller/MagazineController");
const asyncHandler = require("../../../utils/asyncHandler");

router.get("/magazine", asyncHandler(magazineController.getMagazineContent));

module.exports = router;
