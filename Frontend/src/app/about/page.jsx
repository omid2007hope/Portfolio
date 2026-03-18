import AboutPage from "@/components/features/about/AboutPage";
import { getProfile } from "@/lib/api";
import JsonLd from "@/components/seo/JsonLd";
import {
  buildBreadcrumbJsonLd,
  buildPageMetadata,
  buildWebPageJsonLd,
} from "@/lib/seo";

export async function generateMetadata() {
  const profile = await getProfile();

  return buildPageMetadata({
    profile,
    title: `About ${profile?.fullName || "Omid Teimory"} | Portfolio Prime`,
    description:
      profile?.longBio ||
      profile?.shortBio ||
      "Learn more about Omid Teimory, a full-stack developer in Vienna, Austria specializing in frontend engineering, React, and polished product interfaces.",
    path: "/about",
    keywords: [
      "About Omid Teimory",
      "full-stack developer Austria biography",
      "frontend specialist Vienna profile",
    ],
  });
}

export default async function AboutRoute() {
  const profile = await getProfile();

  return (
    <>
      <JsonLd
        data={[
          buildWebPageJsonLd({
            profile,
            path: "/about",
            title: `About ${profile?.fullName || "Omid Teimory"} | Portfolio Prime`,
            description:
              profile?.longBio ||
              profile?.shortBio ||
              "Learn more about Omid Teimory and the full-stack experience behind Portfolio Prime.",
            type: "AboutPage",
          }),
          buildBreadcrumbJsonLd(
            [
              { name: "Home", path: "/" },
              { name: "About", path: "/about" },
            ],
            profile,
          ),
        ]}
      />
      <AboutPage profile={profile} />
    </>
  );
}
