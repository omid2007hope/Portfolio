import { getSocialIcon } from "../social-icons";
import { Globe } from "lucide-react";

describe("getSocialIcon", () => {
  const testKeys = [
    "github",
    "linkedin",
    "x",
    "youtube",
    "kick",
    "instagram",
    "artstation",
    "credly",
    "wonderful.dev",
    "wonderful",
  ];

  testKeys.forEach((key) => {
    test(`returns an icon component for key: "${key}"`, () => {
      const Icon = getSocialIcon(key);
      expect(Icon).toBeDefined();
      expect(typeof Icon).toBe("function");
    });
  });

  test("returns Globe fallback for unknown icon keys", () => {
    expect(getSocialIcon("unknown-key")).toBe(Globe);
    expect(getSocialIcon("")).toBe(Globe);
    expect(getSocialIcon(null)).toBe(Globe);
  });
});
