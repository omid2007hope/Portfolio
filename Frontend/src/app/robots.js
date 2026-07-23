import { getMetadataProfile } from "@/lib/server-api";
import { absoluteUrl } from "@/lib/seo";

export const revalidate = 3600;

export default async function robots() {
  const profile = await getMetadataProfile();
  const siteUrl = absoluteUrl("/", profile).replace(/\/$/, "");

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/favicon.ico",
          "/_next/",
          "/signup",
        ],
      },
    ],
    host: siteUrl,
    sitemap: absoluteUrl("/sitemap.xml", profile),
  };
}
