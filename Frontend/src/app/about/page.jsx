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
      "Learn more about Omid Teimory, a frontend developer in Vienna, Austria focused on Next.js, React, and polished product UI.",
    path: "/about",
    keywords: [
      "About Omid Teimory",
      "frontend developer Austria biography",
      "Next.js developer Vienna profile",
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
              "Learn more about Omid Teimory and the experience behind Portfolio Prime.",
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
