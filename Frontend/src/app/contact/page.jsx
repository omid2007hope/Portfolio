import ContactPage from "@/features/contact/ContactPage";
import JsonLd from "@/components/seo/JsonLd";
import {
  buildBreadcrumbJsonLd,
  buildPageMetadata,
  buildWebPageJsonLd,
} from "@/lib/seo";
import { getProfile } from "@/lib/server-api";

export async function generateMetadata() {
  const profile = await getProfile();

  return buildPageMetadata({
    profile,
    title: `Contact ${profile?.fullName || "Omid Teimory"} | Portfolio Prime`,
    description: `Get in touch with ${profile?.fullName || "Omid Teimory"} — open to freelance projects, full-time roles, and collaborations. Reach out via the contact form or email.`,
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
  const name = profile?.fullName || "Omid Teimory";
  const contactDescription = `Get in touch with ${name} — open to freelance projects, full-time roles, and collaborations. Reach out via the contact form or email.`;

  return (
    <>
      <JsonLd
        data={[
          buildWebPageJsonLd({
            profile,
            path: "/contact",
            title: `Contact ${name} | Portfolio Prime`,
            description: contactDescription,
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
