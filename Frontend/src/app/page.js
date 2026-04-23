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
  const location = profile?.location || "Vienna, Austria";

  return buildPageMetadata({
    profile,
    // Use absolute to avoid root template duplication (keeps title under 60 chars)
    title: { absolute: `${name} | ${jobTitle}` },
    description: `${name} is a ${jobTitle} based in ${location}. Building fast, production-ready web apps with React, Next.js, Node.js, and MongoDB.`,
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
