import { buildRootMetadata, getProjectPath, getSeoProfile } from "@/lib/seo";

describe("seo helpers", () => {
  test("getProjectPath prefers project slugs", () => {
    expect(getProjectPath({ slug: "velora", projectId: 7 })).toBe(
      "/projects/velora",
    );
  });

  test("getProjectPath falls back to projectId when a slug is missing", () => {
    expect(getProjectPath({ projectId: 42 })).toBe("/projects/42");
  });

  test("seo profile falls back to a longer meta description", () => {
    const seo = getSeoProfile({
      fullName: "Omid Teimory",
      jobTitle: "Full-Stack Developer",
      shortBio: "Frontend-focused developer.",
      location: "Vienna, Austria",
      primaryStack: "React, Next.js, Node.js, MongoDB",
      heroSkills: ["React", "Next.js"],
    });

    expect(seo.description.length).toBeGreaterThanOrEqual(130);
    expect(seo.description).toMatch(/React/i);
  });

  test("root metadata uses the longer description", () => {
    const metadata = buildRootMetadata({
      fullName: "Omid Teimory",
      jobTitle: "Full-Stack Developer",
      shortBio: "Frontend-focused developer.",
      location: "Vienna, Austria",
      primaryStack: "React, Next.js, Node.js, MongoDB",
      heroSkills: ["React", "Next.js"],
    });

    expect(metadata.description.length).toBeGreaterThanOrEqual(130);
  });
});
