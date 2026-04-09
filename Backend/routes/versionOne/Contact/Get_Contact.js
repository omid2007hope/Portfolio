const express = require("express");

const router = express.Router();

const contactController = require("../../../controller/ContactController");
const asyncHandler = require("../../../utils/asyncHandler");

router.get("/contacts", asyncHandler(contactController.listContacts));
router.get("/contacts/:id", asyncHandler(contactController.getContactById));

module.exports = router;
