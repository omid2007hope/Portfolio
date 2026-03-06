import ProjectShowcase from "@/components/pages/project/ProjecShowCasePage";
import { getProfile, getProject, getProjects } from "@/lib/api";
import JsonLd from "@/components/seo/JsonLd";
import {
  buildBreadcrumbJsonLd,
  buildPageMetadata,
  buildProjectJsonLd,
} from "@/lib/seo";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  const projects = await getProjects();

  return projects.map((project) => ({
    id: String(project.slug || project.projectId),
  }));
}

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const [project, profile] = await Promise.all([
    getProject(resolvedParams.id),
    getProfile(),
  ]);

  if (!project) {
    return buildPageMetadata({
      profile,
      title: "Project Not Found | Portfolio Prime",
      description: "The requested project case study could not be found.",
      path: `/project/${resolvedParams.id}`,
      noIndex: true,
    });
  }

  return buildPageMetadata({
    profile,
    title: `${project.title} Case Study | Omid Teimory`,
    description:
      project.shortDescription ||
      project.overview ||
      `Explore the ${project.title} case study by ${
        profile?.fullName || "Omid Teimory"
      }.`,
    path: `/project/${project.slug || project.projectId}`,
    keywords: project.techStack || [],
    image: project.coverImage?.url,
    imageAlt: project.coverImage?.alt || `${project.title} cover image`,
  });
}

export default async function ProjectDetailRoute({ params }) {
  const resolvedParams = await params;
  const [project, profile] = await Promise.all([
    getProject(resolvedParams.id),
    getProfile(),
  ]);

  if (!project) {
    notFound();
  }

  return (
    <>
      <JsonLd
        data={[
          buildProjectJsonLd(project, profile),
          buildBreadcrumbJsonLd(
            [
              { name: "Home", path: "/" },
              { name: "Projects", path: "/projects" },
              {
                name: project.title,
                path: `/project/${project.slug || project.projectId}`,
              },
            ],
            profile,
          ),
        ]}
      />
      <ProjectShowcase project={project} profile={profile} />
    </>
  );
}
