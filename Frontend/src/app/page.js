import HomePage from "@/features/home/HomePage";
import JsonLd from "@/components/seo/JsonLd";
import {
  buildPageMetadata,
  buildWebPageJsonLd,
  getSeoProfile,
} from "@/lib/seo";
import { getProfile } from "@/lib/server-api";

export async function generateMetadata() {
  const profile = await getProfile();
  const name = profile?.fullName || "Omid Teimory";
  const jobTitle = profile?.jobTitle || "Frontend / Full-Stack Developer";

  return buildPageMetadata({
    profile,
    title: `${name} | ${jobTitle}`,
    path: "/",
    keywords: [
      "full-stack developer Vienna",
      "frontend specialist Vienna",
      "React portfolio Vienna",
    ],
  });
}

export default async function Page() {
  const profile = await getProfile();
  const seo = getSeoProfile(profile);

  return (
    <>
      <JsonLd
        data={buildWebPageJsonLd({
          profile,
          path: "/",
          title: "Omid Teimory | Portfolio Prime",
          description: seo.description,
        })}
      />
      <HomePage profile={profile} />
    </>
  );
}
