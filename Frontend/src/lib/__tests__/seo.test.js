import { getProjectPath } from "@/lib/seo";

describe("seo helpers", () => {
  test("getProjectPath prefers project slugs", () => {
    expect(getProjectPath({ slug: "velora", projectId: 7 })).toBe(
      "/projects/velora",
    );
  });

  test("getProjectPath falls back to projectId when a slug is missing", () => {
    expect(getProjectPath({ projectId: 42 })).toBe("/projects/42");
  });
});
