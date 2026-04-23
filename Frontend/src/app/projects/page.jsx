import ProjectsPage from "@/features/projects/ProjectsPage";
import JsonLd from "@/components/seo/JsonLd";
import {
  buildBreadcrumbJsonLd,
  buildPageMetadata,
  buildProjectsPageJsonLd,
} from "@/lib/seo";
import { getProfile, getProjects } from "@/lib/server-api";

export async function generateMetadata() {
  const profile = await getProfile();

  return buildPageMetadata({
    profile,
    title: "Projects and Case Studies | Omid Teimory",
    description:
      "Browse real-world projects and case studies by Omid Teimory — full-stack web apps built with React, Next.js, Node.js, and MongoDB. Each project includes an overview, tech stack, and outcome.",
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
