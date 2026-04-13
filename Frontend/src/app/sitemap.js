import { getMetadataProfile, getMetadataProjects } from "@/lib/server-api";
import { absoluteUrl, getProjectPath } from "@/lib/seo";

export const revalidate = 3600;

export default async function sitemap() {
  const [profile, projects] = await Promise.all([
    getMetadataProfile(),
    getMetadataProjects(),
  ]);
  const now = new Date();
  const staticRoutes = [
    { path: "/", priority: 1, changeFrequency: "weekly" },
    { path: "/projects", priority: 0.9, changeFrequency: "weekly" },
    { path: "/about", priority: 0.8, changeFrequency: "monthly" },
    { path: "/resume", priority: 0.8, changeFrequency: "monthly" },
    { path: "/contact", priority: 0.8, changeFrequency: "monthly" },
  ];

  return [
    ...staticRoutes.map((route) => ({
      url: absoluteUrl(route.path, profile),
      lastModified: profile?.updatedAt || now,
      changeFrequency: route.changeFrequency,
      priority: route.priority,
    })),
    ...projects.map((project) => ({
      url: absoluteUrl(getProjectPath(project), profile),
      lastModified: project.updatedAt || project.createdAt || now,
      changeFrequency: "monthly",
      priority: project.featured ? 0.85 : 0.75,
    })),
  ];
}
