const projectService = require("../services/ProjectService");

describe("ProjectService", () => {
  const originalModel = projectService.model;

  afterEach(() => {
    projectService.model = originalModel;
    jest.restoreAllMocks();
  });

  test("serializes project fields for frontend consumers", () => {
    const result = projectService._serializeProject({
      _id: "507f1f77bcf86cd799439011",
      projectId: 7,
      slug: "portfolio-prime",
      title: "Portfolio Prime",
      shortDescription: "Full-stack portfolio",
      overview: "Overview",
      challengesAndSolutions: "Challenges",
      improvements: "Improvements",
      highlightQuote: "Quote",
      role: "Developer",
      duration: "3 weeks",
      status: "published",
      featured: true,
      techStack: ["Next.js"],
      coverImage: { url: "https://example.com/cover.jpg" },
      showcaseImages: [],
      actions: [],
      repositoryUrl: "https://github.com/example/repo",
      liveDemoUrl: "https://example.com",
      sortOrder: 1,
      createdAt: new Date("2026-01-01"),
      updatedAt: new Date("2026-01-02"),
    });

    expect(result).toMatchObject({
      id: "507f1f77bcf86cd799439011",
      projectId: 7,
      slug: "portfolio-prime",
      desc: "Full-stack portfolio",
      tech: ["Next.js"],
      src: "https://github.com/example/repo",
    });
  });

  test("uses numeric identifiers as projectId queries", async () => {
    const findOne = jest.fn().mockReturnValue({
      lean: jest.fn().mockResolvedValue(null),
    });

    projectService.model = { findOne };

    await projectService.getProjectByIdentifier("42");

    expect(findOne).toHaveBeenCalledWith(
      expect.objectContaining({
        projectId: 42,
        isDeleted: { $ne: true },
      }),
    );
  });
});
