/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import SiteFooter from "@/components/layout/SiteFooter";
import { getProjectPath } from "@/lib/seo";

function Project({ projects, profile }) {
  return (
    <section className="flex min-h-[calc(100vh-5rem)] w-full justify-center px-6 py-8 text-white">
      <div className="flex w-full max-w-6xl flex-col justify-center">
        <div className="mb-10 text-center">
          <h1 className="text-3xl font-extrabold sm:text-4xl">
            Selected Projects
          </h1>
          <p className="mt-2 text-lg text-white/70">
            A collection of recent work pulled directly from the backend portfolio API.
          </p>
        </div>

        <div className="mb-10 flex justify-center gap-4">
          <button className="rounded-lg border border-white/10 bg-white/5 px-5 py-2 font-medium transition hover:bg-white/10">
            All
          </button>
        </div>

        {projects?.length ? (
          <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <div
                key={project.id}
                className="rounded-2xl border border-white/10 bg-white/5 p-5 transition hover:bg-white/10"
              >
                <Link href={getProjectPath(project)}>
                  <div className="mb-5 h-48 w-full overflow-hidden rounded-xl">
                    {project.coverImage?.url ? (
                      <img
                        src={project.coverImage.url}
                        alt={project.coverImage.alt || project.title}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center bg-slate-900/70 text-sm text-slate-400">
                        Preview coming soon
                      </div>
                    )}
                  </div>

                  <h2 className="mt-3 text-xl font-bold">{project.title}</h2>
                  <p className="mt-2 text-sm leading-relaxed text-white/60">
                    {project.shortDescription}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {(project.techStack || []).map((techItem) => (
                      <span
                        key={techItem}
                        className="rounded-lg border border-white/10 bg-white/10 px-3 py-1 text-xs font-medium"
                      >
                        {techItem}
                      </span>
                    ))}
                  </div>
                </Link>

                <div className="mt-5 flex gap-4">
                  <a
                    href={project.liveDemoUrl || undefined}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex-1 rounded-lg px-4 py-2 text-center text-sm font-semibold ${
                      project.liveDemoUrl
                        ? "bg-blue-600 hover:bg-blue-700"
                        : "cursor-not-allowed border border-white/10 bg-white/5 opacity-60"
                    }`}
                    aria-disabled={!project.liveDemoUrl}
                    tabIndex={project.liveDemoUrl ? undefined : -1}
                  >
                    {project.liveDemoUrl ? "Live Demo" : "Live Demo (coming soon)"}
                  </a>

                  <a
                    href={project.repositoryUrl || undefined}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 rounded-lg border border-white/10 bg-white/10 px-4 py-2 text-center text-sm font-semibold hover:bg-white/20"
                  >
                    Source
                  </a>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-white/10 bg-white/5 p-10 text-center text-white/70">
            No projects have been added to the backend yet.
          </div>
        )}

        <SiteFooter profile={profile} />
      </div>
    </section>
  );
}

export default Project;
