import HomePage from "@/features/home/HomePage";
import JsonLd from "@/components/seo/JsonLd";
import {
  buildPageMetadata,
  buildWebPageJsonLd,
  getSeoProfile,
} from "@/lib/seo";
import { getPortfolioProfile } from "@/services/portfolioService";

export async function generateMetadata() {
  const profile = await getPortfolioProfile();

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
  const profile = await getPortfolioProfile();
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
