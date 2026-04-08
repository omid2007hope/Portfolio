import {
  ensureResumeLink,
  getContactIntroTitle,
  getAboutParagraphs,
  getHeaderBannerText,
  getHomeInfoCards,
  getHomeTitle,
  getHeroDescription,
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
    expect(getSocialLinks({})).toHaveLength(6);
  });

  test("returns fallback about paragraphs when profile data is missing", () => {
    expect(getAboutParagraphs({})).toHaveLength(3);
    expect(getAboutParagraphs({})[0].content).toMatch(
      /complete web applications from idea to launch/i,
    );
  });

  test("returns a longer fallback hero description", () => {
    expect(getHeroDescription({})).toMatch(/fast, modern web applications/i);
    expect(getHeroDescription({}).length).toBeGreaterThan(40);
  });

  test("uses profile-driven copy when available", () => {
    const profile = {
      headerBannerText: "Open for senior frontend roles",
      homeTitle: "Backend-powered hero title",
      contactIntroTitle: "Let us talk about your build",
      homeInfoCards: [{ title: "Custom", text: "From the API" }],
    };

    expect(getHeaderBannerText(profile)).toBe("Open for senior frontend roles");
    expect(getHomeTitle(profile)).toBe("Backend-powered hero title");
    expect(getContactIntroTitle(profile)).toBe("Let us talk about your build");
    expect(getHomeInfoCards(profile)).toEqual([
      { title: "Custom", text: "From the API" },
    ]);
  });
});
