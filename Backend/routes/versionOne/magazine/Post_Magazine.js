const express = require("express");

const router = express.Router();

const magazineController = require("../../../controller/MagazineController");
const asyncHandler = require("../../../utils/asyncHandler");

router.post("/magazine", asyncHandler(magazineController.postMagazineContent));

module.exports = router;
