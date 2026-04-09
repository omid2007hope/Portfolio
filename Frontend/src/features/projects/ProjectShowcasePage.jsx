/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import SiteFooter from "@/components/layout/SiteFooter";
import ProjectDetailContent from "@/features/projects/components/ProjectDetailContent";
import ProjectDetailSidebar from "@/features/projects/components/ProjectDetailSidebar";

function ProjectShowcasePage({ project, profile }) {
  if (!project) {
    return <div className="p-20 text-white">Project not found.</div>;
  }

  return (
    <div className="flex min-h-screen w-full justify-center px-6 py-16 text-white">
      <div className="w-full max-w-7xl">
        <nav
          aria-label="Breadcrumb"
          className="mb-6 flex flex-wrap items-center gap-2 text-sm text-white/60"
        >
          <Link href="/" className="transition hover:text-white">
            Home
          </Link>
          <span>/</span>
          <Link href="/projects" className="transition hover:text-white">
            Projects
          </Link>
          <span>/</span>
          <span className="text-white">{project.title}</span>
        </nav>

        <h1 className="text-4xl font-extrabold leading-snug">{project.title}</h1>
        <p className="mb-12 mt-2 max-w-3xl text-lg text-white/70">
          {project.shortDescription}
        </p>

        <div className="mb-12 h-96 w-full overflow-hidden rounded-2xl">
          {project.coverImage?.url ? (
            <img
              src={project.coverImage.url}
              alt={project.coverImage.alt || `${project.title} cover`}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full items-center justify-center bg-slate-900/70 text-slate-400">
              Preview coming soon
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
          <ProjectDetailSidebar project={project} />
          <ProjectDetailContent project={project} />
        </div>

        <SiteFooter profile={profile} />
      </div>
    </div>
  );
}

export default ProjectShowcasePage;
