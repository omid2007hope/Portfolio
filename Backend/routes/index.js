const express = require("express");
const profileController = require("../controller/ProfileController");
const projectController = require("../controller/ProjectController");
const resumeController = require("../controller/ResumeController");
const contactController = require("../controller/ContactController");
const chatController = require("../controller/ChatController");
const asyncHandler = require("../utils/asyncHandler");
const {
  ensureBodyObject,
  validateChatMessage,
  validateContactSubmission,
} = require("../middleware/validation/requestValidators");

const router = express.Router();

router.get("/server", (_req, res) => {
  res.status(200).send("server is running");
});

router.get("/profile", asyncHandler(profileController.getProfile));
router.get("/portfolio/profile", asyncHandler(profileController.getProfile));
router.get("/profiles", asyncHandler(profileController.listProfiles));
router.get("/profiles/:id", asyncHandler(profileController.getProfileById));
router.post(
  "/profiles",
  ensureBodyObject,
  asyncHandler(profileController.createProfile),
);
router.patch(
  "/profiles/:id",
  ensureBodyObject,
  asyncHandler(profileController.updateProfile),
);
router.delete("/profiles/:id", asyncHandler(profileController.deleteProfile));

router.get("/projects", asyncHandler(projectController.getProjects));
router.get(
  "/projects/:identifier",
  asyncHandler(projectController.getProjectByIdentifier),
);
router.post(
  "/projects",
  ensureBodyObject,
  asyncHandler(projectController.createProject),
);
router.patch(
  "/projects/:id",
  ensureBodyObject,
  asyncHandler(projectController.updateProject),
);
router.delete("/projects/:id", asyncHandler(projectController.deleteProject));

router.get("/resume", asyncHandler(resumeController.getResume));
router.get("/resumes", asyncHandler(resumeController.listResumes));
router.get("/resumes/:id", asyncHandler(resumeController.getResumeById));
router.post(
  "/resumes",
  ensureBodyObject,
  asyncHandler(resumeController.createResume),
);
router.patch(
  "/resumes/:id",
  ensureBodyObject,
  asyncHandler(resumeController.updateResume),
);
router.delete("/resumes/:id", asyncHandler(resumeController.deleteResume));

router.post(
  "/contact",
  ensureBodyObject,
  validateContactSubmission,
  asyncHandler(contactController.createContactSubmission),
);
router.get("/contacts", asyncHandler(contactController.listContacts));
router.get("/contacts/:id", asyncHandler(contactController.getContactById));
router.patch(
  "/contacts/:id",
  ensureBodyObject,
  asyncHandler(contactController.updateContactSubmission),
);
router.delete(
  "/contacts/:id",
  asyncHandler(contactController.deleteContactSubmission),
);

router.post(
  "/chat",
  ensureBodyObject,
  validateChatMessage,
  asyncHandler(chatController.sendMessage),
);
router.get("/chats", asyncHandler(chatController.listConversations));
router.get("/chat/:sessionId", asyncHandler(chatController.getConversation));
router.patch(
  "/chat/:sessionId",
  ensureBodyObject,
  asyncHandler(chatController.updateConversation),
);
router.delete(
  "/chat/:sessionId",
  asyncHandler(chatController.deleteConversation),
);

module.exports = router;
