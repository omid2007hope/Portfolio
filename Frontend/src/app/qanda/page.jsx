import JsonLd from "@/components/seo/JsonLd";
import QandAPage from "@/features/publicChat/QandA/QandAPage";
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
    title: "Developer Q&A | Portfolio Prime",
    description:
      "Ask software development questions, post practical answers, and build discoverable technical discussions.",
    path: "/qanda",
    keywords: [
      "developer q&a",
      "software engineering questions",
      "coding help community",
    ],
  });
}

export default async function QandARoute() {
  const profile = await getProfile();

  return (
    <>
      <JsonLd
        data={[
          buildWebPageJsonLd({
            profile,
            path: "/qanda",
            title: "Developer Q&A | Portfolio Prime",
            description:
              "Community Q&A space for software engineering discussions.",
            type: "FAQPage",
          }),
          buildBreadcrumbJsonLd(
            [
              { name: "Home", path: "/" },
              { name: "Q&A", path: "/qanda" },
            ],
            profile,
          ),
        ]}
      />
      <QandAPage profile={profile} />
    </>
  );
}
