import JsonLd from "@/components/seo/JsonLd";
import PageSection from "@/components/layout/PageSection";
import SiteFooter from "@/components/layout/SiteFooter";
import SignupPage from "@/features/auth/SignupPage";
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
    title: "Sign Up for Community Access | Portfolio Prime",
    description:
      "Create an anonymous community account with email code login to post in chat and comments.",
    path: "/signup",
    keywords: ["community signup", "anonymous account", "email code login"],
    noIndex: true,
  });
}

export default async function SignupRoute() {
  const profile = await getProfile();

  return (
    <>
      <JsonLd
        data={[
          buildWebPageJsonLd({
            profile,
            path: "/signup",
            title: "Sign Up for Community Access | Portfolio Prime",
            description:
              "Create an anonymous community account with email code login to post in chat and comments.",
            type: "WebPage",
          }),
          buildBreadcrumbJsonLd(
            [
              { name: "Home", path: "/" },
              { name: "Sign Up", path: "/signup" },
            ],
            profile,
          ),
        ]}
      />

      <PageSection>
        <div className="space-y-8">
          <SignupPage />
          <SiteFooter profile={profile} />
        </div>
      </PageSection>
    </>
  );
}
