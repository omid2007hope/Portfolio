import {
  ensureResumeLink,
  getAboutParagraphs,
  getHeroSkills,
  getSocialLinks,
} from "@/lib/site-content";

describe("site-content helpers", () => {
  test("ensureResumeLink adds resume exactly once", () => {
    const items = ensureResumeLink([{ label: "Home", to: "/" }]);

    expect(items.some((item) => item.to === "/resume")).toBe(true);
    expect(ensureResumeLink(items).filter((item) => item.to === "/resume")).toHaveLength(1);
  });

  test("returns fallback hero skills and social links", () => {
    expect(getHeroSkills({})).toContain("Next.js");
    expect(getSocialLinks({})).toHaveLength(3);
  });

  test("returns fallback about paragraphs when profile data is missing", () => {
    expect(getAboutParagraphs({})).toHaveLength(3);
  });
});
