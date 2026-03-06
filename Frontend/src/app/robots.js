import { getProfile } from "@/lib/api";
import { absoluteUrl } from "@/lib/seo";

export default async function robots() {
  const profile = await getProfile();

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
