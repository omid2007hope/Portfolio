import HomePage from "@/components/features/home/HomePage";
import { getProfile } from "@/lib/api";
import JsonLd from "@/components/seo/JsonLd";
import {
  buildPageMetadata,
  buildWebPageJsonLd,
  getSeoProfile,
} from "@/lib/seo";

export async function generateMetadata() {
  const profile = await getProfile();

  return buildPageMetadata({
    profile,
    title: "Omid Teimory | Frontend / Full-Stack Developer",
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
