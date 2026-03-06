// © 2026 Omid Teimory. All rights reserved.
// Signature: OmidTeimory-2026
const { randomUUID } = require("crypto");
const BaseService = require("./BaseService");
const { ChatConversation } = require("../model/version_1");
const portfolioProfileService = require("./PortfolioProfileService");
const projectService = require("./ProjectService");
const resumeService = require("./ResumeService");

class ChatConversationService extends BaseService {
  constructor() {
    super(ChatConversation);
  }

  _serializeConversation = (conversation) => ({
    id: String(conversation._id),
    sessionId: conversation.sessionId,
    title: conversation.title,
    status: conversation.status,
    lastMessageAt: conversation.lastMessageAt,
    messages: conversation.messages || [],
    createdAt: conversation.createdAt,
    updatedAt: conversation.updatedAt,
  });

  _buildReply = async (message) => {
    const normalized = String(message).toLowerCase();
    const [profile, projects, resume] = await Promise.all([
      portfolioProfileService.getPublicProfile(),
      projectService.listProjects(),
      resumeService.getLatestResume(),
    ]);

    if (normalized.includes("contact") || normalized.includes("email")) {
      if (!profile) {
        return "I do not have contact details saved yet, but you can use the contact form on the site.";
      }

      return `You can reach ${profile.fullName} at ${profile.email}${
        profile.phoneNumber ? ` or ${profile.phoneNumber}` : ""
      }.`;
    }

    if (normalized.includes("project") || normalized.includes("work")) {
      if (!projects.length) {
        return "Projects have not been added to the portfolio database yet.";
      }

      const projectList = projects
        .slice(0, 3)
        .map((project) => project.title)
        .join(", ");

      return `Recent projects include ${projectList}. Ask about a specific project for more detail.`;
    }

    if (normalized.includes("resume") || normalized.includes("experience")) {
      if (!resume) {
        return "The resume is not available yet.";
      }

      return `${resume.profileName} is focused on ${resume.headline}. ${resume.summary}`;
    }

    if (normalized.includes("skill") || normalized.includes("stack")) {
      if (!profile?.heroSkills?.length) {
        return "Skills are not configured yet.";
      }

      return `Core skills include ${profile.heroSkills.slice(0, 8).join(", ")}.`;
    }

    if (profile) {
      return `${profile.fullName} is a ${profile.jobTitle}. ${profile.shortBio}`;
    }

    return "Thanks for your message. The portfolio assistant is online, but the profile content has not been configured yet.";
  };

  listConversations = async ({ status } = {}) => {
    const condition = {};

    if (status) {
      condition.status = status;
    }

    const conversations = await this.model
      .find(this._active(condition))
      .sort({ lastMessageAt: -1, updatedAt: -1 })
      .lean();

    return conversations.map(this._serializeConversation);
  };

  createOrAppendMessage = async ({ sessionId, message }) => {
    const normalizedSessionId = String(sessionId || randomUUID()).trim();
    const cleanMessage = String(message).trim();
    const assistantReply = await this._buildReply(cleanMessage);
    const now = new Date();

    let conversation = await this.model.findOne(
      this._active({ sessionId: normalizedSessionId }),
    );

    if (!conversation) {
      conversation = await this.createObject({
        sessionId: normalizedSessionId,
        title: cleanMessage.slice(0, 60),
        status: "active",
        lastMessageAt: now,
        messages: [
          { sender: "user", text: cleanMessage, sentAt: now },
          { sender: "assistant", text: assistantReply, sentAt: now },
        ],
      });
    } else {
      conversation.messages.push(
        { sender: "user", text: cleanMessage, sentAt: now },
        { sender: "assistant", text: assistantReply, sentAt: now },
      );
      conversation.lastMessageAt = now;
      conversation.status = "active";
      conversation.title = conversation.title || cleanMessage.slice(0, 60);
      await conversation.save();
    }

    return {
      sessionId: conversation.sessionId,
      reply: assistantReply,
      conversation: this._serializeConversation(conversation.toObject()),
    };
  };

  getConversation = async (sessionId) => {
    const conversation = await this.model
      .findOne(this._active({ sessionId }))
      .lean();

    return conversation ? this._serializeConversation(conversation) : null;
  };

  updateConversation = async (sessionId, payload) => {
    const conversation = await this.update(
      this._active({ sessionId }),
      payload,
    );

    return conversation ? this._serializeConversation(conversation.toObject()) : null;
  };

  deleteConversation = async (sessionId) => {
    const conversation = await this.softDelete({ sessionId }, "system");
    return conversation ? this._serializeConversation(conversation.toObject()) : null;
  };
}

module.exports = new ChatConversationService();
