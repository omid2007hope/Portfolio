import Project from "@/components/pages/project/ProjectPage";
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
      "Explore selected Next.js, React, and full-stack case studies from Omid Teimory, a frontend developer based in Vienna, Austria.",
    path: "/projects",
    keywords: [
      "Next.js projects",
      "React case studies",
      "frontend portfolio projects",
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
      <Project projects={projects} profile={profile} />
    </>
  );
}
