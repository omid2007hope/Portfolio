const request = require("supertest");

jest.mock("../services/PortfolioProfileService", () => ({
  getPublicProfile: jest.fn(),
  listProfiles: jest.fn(),
  getProfileById: jest.fn(),
  createProfile: jest.fn(),
  updateProfileById: jest.fn(),
  deleteProfileById: jest.fn(),
}));

jest.mock("../services/ProjectService", () => ({
  listProjects: jest.fn(),
  getProjectByIdentifier: jest.fn(),
  createProject: jest.fn(),
  updateProject: jest.fn(),
  deleteProject: jest.fn(),
}));

jest.mock("../services/ResumeService", () => ({
  getLatestResume: jest.fn(),
  listResumes: jest.fn(),
  getResumeById: jest.fn(),
  createResume: jest.fn(),
  updateResume: jest.fn(),
  deleteResume: jest.fn(),
}));

jest.mock("../services/ContactSubmissionService", () => ({
  createFromRequest: jest.fn(),
  listSubmissions: jest.fn(),
  getSubmissionById: jest.fn(),
  updateSubmission: jest.fn(),
  deleteSubmission: jest.fn(),
}));

jest.mock("../services/ChatConversationService", () => ({
  listConversations: jest.fn(),
  createOrAppendMessage: jest.fn(),
  getConversation: jest.fn(),
  updateConversation: jest.fn(),
  deleteConversation: jest.fn(),
}));

const profileService = require("../services/PortfolioProfileService");
const contactService = require("../services/ContactSubmissionService");
const chatService = require("../services/ChatConversationService");
const app = require("../app");

describe("API app", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test("returns root health payload", async () => {
    const response = await request(app).get("/");

    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Portfolio Prime API");
  });

  test("returns the public profile", async () => {
    profileService.getPublicProfile.mockResolvedValue({
      id: "profile-1",
      fullName: "Omid Teimory",
    });

    const response = await request(app).get("/api/profile");

    expect(response.status).toBe(200);
    expect(response.body.fullName).toBe("Omid Teimory");
  });

  test("rejects invalid contact payloads before service execution", async () => {
    const response = await request(app).post("/api/contact").send({
      name: "Omid",
      email: "invalid-email",
      subject: "Hello",
      message: "Testing",
    });

    expect(response.status).toBe(400);
    expect(contactService.createFromRequest).not.toHaveBeenCalled();
  });

  test("creates contact submissions with sanitized input", async () => {
    contactService.createFromRequest.mockResolvedValue({ id: "contact-1" });

    const response = await request(app).post("/api/contact").send({
      name: " Omid ",
      email: " OMID@example.com ",
      subject: " Portfolio ",
      message: " Hello there ",
    });

    expect(response.status).toBe(201);
    expect(contactService.createFromRequest).toHaveBeenCalledWith(
      {
        name: "Omid",
        email: "omid@example.com",
        subject: "Portfolio",
        message: "Hello there",
        source: "portfolio-contact-form",
      },
      expect.any(Object),
    );
  });

  test("rejects empty chat messages", async () => {
    const response = await request(app).post("/api/chat").send({
      message: "   ",
    });

    expect(response.status).toBe(400);
    expect(chatService.createOrAppendMessage).not.toHaveBeenCalled();
  });

  test("sends valid chat messages", async () => {
    chatService.createOrAppendMessage.mockResolvedValue({
      sessionId: "session-1",
      reply: "Hello",
    });

    const response = await request(app).post("/api/chat").send({
      sessionId: " session-1 ",
      message: " Hi ",
    });

    expect(response.status).toBe(200);
    expect(chatService.createOrAppendMessage).toHaveBeenCalledWith({
      sessionId: "session-1",
      message: "Hi",
    });
  });
});
