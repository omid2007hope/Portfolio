const express = require("express");

const getChatRoutes = require("./Get_Chat");
const postChatRoutes = require("./Post_Chat");
const patchChatRoutes = require("./Patch_Chat");
const deleteChatRoutes = require("./Delete_Chat");

const router = express.Router();

router.use(getChatRoutes);
router.use(postChatRoutes);
router.use(patchChatRoutes);
router.use(deleteChatRoutes);

module.exports = router;
