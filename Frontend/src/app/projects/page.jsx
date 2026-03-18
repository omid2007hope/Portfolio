import ProjectsPage from "@/components/features/projects/ProjectsPage";
import { getProfile, getProjects } from "@/lib/api";
import JsonLd from "@/components/seo/JsonLd";
import {
  buildBreadcrumbJsonLd,
  buildPageMetadata,
  buildProjectsPageJsonLd,
} from "@/lib/seo";

export async function generateMetadata() {
  const profile = await getProfile();

  return buildPageMetadata({
    profile,
    title: "Projects and Case Studies | Omid Teimory",
    description:
      "Explore selected React, Next.js, and full-stack case studies from Omid Teimory, a full-stack developer in Vienna, Austria with a frontend specialization.",
    path: "/projects",
    keywords: [
      "Next.js projects",
      "React case studies",
      "full-stack portfolio projects",
    ],
    type: "website",
  });
}

export default async function ProjectsRoute() {
  const [projects, profile] = await Promise.all([getProjects(), getProfile()]);

  return (
    <>
      <JsonLd
        data={[
          buildProjectsPageJsonLd(projects, profile),
          buildBreadcrumbJsonLd(
            [
              { name: "Home", path: "/" },
              { name: "Projects", path: "/projects" },
            ],
            profile,
          ),
        ]}
      />
      <ProjectsPage projects={projects} profile={profile} />
    </>
  );
}
