import JsonLd from "@/components/seo/JsonLd";
import PublicChatPage from "@/features/publicChat/chat/PublicChatPage";
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
    title: "Public Group Chat | Portfolio Prime",
    description:
      "Join the public developer chat to discuss projects, share updates, and reply in threaded conversations.",
    path: "/public-chat",
    keywords: [
      "developer group chat",
      "public coding community",
      "portfolio community chat",
    ],
  });
}

export default async function PublicChatRoute() {
  const profile = await getProfile();

  return (
    <>
      <JsonLd
        data={[
          buildWebPageJsonLd({
            profile,
            path: "/public-chat",
            title: "Public Group Chat | Portfolio Prime",
            description: "Open community chat for developers and visitors.",
            type: "DiscussionForumPosting",
          }),
          buildBreadcrumbJsonLd(
            [
              { name: "Home", path: "/" },
              { name: "Public Chat", path: "/public-chat" },
            ],
            profile,
          ),
        ]}
      />
      <PublicChatPage profile={profile} />
    </>
  );
}
