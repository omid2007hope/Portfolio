import { getMetadataProfile } from "@/lib/server-api";
import { absoluteUrl } from "@/lib/seo";

export const revalidate = 3600;

export default async function robots() {
  const profile = await getMetadataProfile();

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
    ],
    sitemap: absoluteUrl("/sitemap.xml", profile),
  };
}
