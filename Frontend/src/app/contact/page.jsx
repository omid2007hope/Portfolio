import ContactPage from "@/components/features/contact/ContactPage";
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
    title: `Contact ${profile?.fullName || "Omid Teimory"} | Portfolio Prime`,
    description:
      "Contact Omid Teimory for freelance, collaboration, and full-stack project inquiries with a frontend focus in Austria and remote.",
    path: "/contact",
    keywords: [
      "hire full-stack developer Austria",
      "contact frontend specialist Vienna",
      "freelance web developer Austria",
    ],
  });
}

export default async function ContactRoute() {
  const profile = await getProfile();

  return (
    <>
      <JsonLd
        data={[
          buildWebPageJsonLd({
            profile,
            path: "/contact",
            title: `Contact ${profile?.fullName || "Omid Teimory"} | Portfolio Prime`,
            description:
              "Contact Omid Teimory for freelance, collaboration, and full-stack development opportunities with a frontend focus.",
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
