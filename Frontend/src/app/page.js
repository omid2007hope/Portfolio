import HomePage from "@/components/features/home/HomePage";
import { getProfile } from "@/lib/api";
import JsonLd from "@/components/seo/JsonLd";
import { buildPageMetadata, buildWebPageJsonLd } from "@/lib/seo";

export async function generateMetadata() {
  const profile = await getProfile();

  return buildPageMetadata({
    profile,
    title: "Omid Teimory | Next.js Developer in Vienna, Austria",
    description:
      profile?.shortBio ||
      "Frontend developer in Vienna, Austria building fast, accessible, and polished web products with Next.js and React.",
    path: "/",
    keywords: [
      "Next.js developer Vienna",
      "frontend portfolio Austria",
      "React portfolio Vienna",
    ],
  });
}

export default async function Page() {
  const profile = await getProfile();

  return (
    <>
      <JsonLd
        data={buildWebPageJsonLd({
          profile,
          path: "/",
          title: "Omid Teimory | Portfolio Prime",
          description:
            profile?.shortBio ||
            "Frontend developer in Vienna, Austria building modern Next.js and React experiences.",
        })}
      />
      <HomePage profile={profile} />
    </>
  );
}
