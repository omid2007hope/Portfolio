import AboutPage from "@/features/about/AboutPage";
import JsonLd from "@/components/seo/JsonLd";
import {
  buildBreadcrumbJsonLd,
  buildPageMetadata,
  buildWebPageJsonLd,
  getSeoProfile,
} from "@/lib/seo";
import { getProfile } from "@/lib/server-api";

export async function generateMetadata() {
  const profile = await getProfile();

  return buildPageMetadata({
    profile,
    title: `About ${profile?.fullName || "Omid Teimory"} | Portfolio Prime`,
    description: `Learn about ${profile?.fullName || "Omid Teimory"} — a ${profile?.jobTitle || "Frontend / Full-Stack Developer"} based in ${profile?.location || "Vienna, Austria"}. Background, process, and what drives the work.`,
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
  const seo = getSeoProfile(profile);

  return (
    <>
      <JsonLd
        data={[
          buildWebPageJsonLd({
            profile,
            path: "/about",
            title: `About ${profile?.fullName || "Omid Teimory"} | Portfolio Prime`,
            description: seo.description,
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
