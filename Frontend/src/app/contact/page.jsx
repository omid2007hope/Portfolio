import ContactPage from "@/features/contact/ContactPage";
import JsonLd from "@/components/seo/JsonLd";
import {
  buildBreadcrumbJsonLd,
  buildPageMetadata,
  buildWebPageJsonLd,
  getSeoProfile,
} from "@/lib/seo";
import { getPortfolioProfile } from "@/services/portfolioService";

export async function generateMetadata() {
  const profile = await getPortfolioProfile();

  return buildPageMetadata({
    profile,
    title: `Contact ${profile?.fullName || "Omid Teimory"} | Portfolio Prime`,
    path: "/contact",
    keywords: [
      "hire full-stack developer Austria",
      "contact frontend specialist Vienna",
      "freelance web developer Austria",
    ],
  });
}

export default async function ContactRoute() {
  const profile = await getPortfolioProfile();
  const seo = getSeoProfile(profile);

  return (
    <>
      <JsonLd
        data={[
          buildWebPageJsonLd({
            profile,
            path: "/contact",
            title: `Contact ${profile?.fullName || "Omid Teimory"} | Portfolio Prime`,
            description: seo.description,
            type: "ContactPage",
          }),
          buildBreadcrumbJsonLd(
            [
              { name: "Home", path: "/" },
              { name: "Contact", path: "/contact" },
            ],
            profile,
          ),
        ]}
      />
      <ContactPage profile={profile} />
    </>
  );
}
