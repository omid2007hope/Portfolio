import ProjectShowcasePage from "@/features/projects/ProjectShowcasePage";
import JsonLd from "@/components/seo/JsonLd";
import {
  buildBreadcrumbJsonLd,
  buildPageMetadata,
  buildProjectJsonLd,
} from "@/lib/seo";
import { notFound } from "next/navigation";
import {
  getPortfolioProfile,
  getPortfolioProject,
  getPortfolioProjects,
} from "@/services/portfolioService";

export async function generateStaticParams() {
  const projects = await getPortfolioProjects();

  return projects
    .map((project) => ({
      slug: String(project.slug || project.projectId),
    }))
    .filter((params) => Boolean(params.slug));
}

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const [project, profile] = await Promise.all([
    getPortfolioProject(resolvedParams.slug),
    getPortfolioProfile(),
  ]);

  if (!project) {
    return buildPageMetadata({
      profile,
      title: "Project Not Found | Portfolio Prime",
      description: "The requested project case study could not be found.",
      path: `/projects/${resolvedParams.slug}`,
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
    path: `/projects/${project.slug || project.projectId}`,
    keywords: project.techStack || [],
    image: project.coverImage?.url,
    imageAlt: project.coverImage?.alt || `${project.title} cover image`,
  });
}

export default async function ProjectDetailRoute({ params }) {
  const resolvedParams = await params;
  const [project, profile] = await Promise.all([
    getPortfolioProject(resolvedParams.slug),
    getPortfolioProfile(),
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
                path: `/projects/${project.slug || project.projectId}`,
              },
            ],
            profile,
          ),
        ]}
      />
      <ProjectShowcasePage project={project} profile={profile} />
    </>
  );
}
