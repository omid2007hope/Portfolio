import { getMetadataProfile } from "@/lib/server-api";
import { getSeoProfile } from "@/lib/seo";

export const revalidate = 3600;

export default async function manifest() {
  const profile = await getMetadataProfile();
  const seo = getSeoProfile(profile);

  return {
    name: `${seo.siteName} | ${seo.personName}`,
    short_name: seo.siteName,
    description: seo.description,
    start_url: "/",
    display: "standalone",
    background_color: "#020617",
    theme_color: "#020617",
    lang: seo.htmlLang,
    categories: ["portfolio", "technology", "developer"],
    icons: [
      {
        src: "/icon.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icon.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
