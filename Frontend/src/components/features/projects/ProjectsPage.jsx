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
            A collection of case studies pulled directly from the backend portfolio API.
          </p>
        </div>

        <div className="mx-auto mb-12 grid max-w-5xl gap-8 rounded-2xl border border-white/10 bg-white/5 p-6 lg:grid-cols-2">
          <section className="space-y-4">
            <p className="text-sm font-semibold uppercase tracking-wide text-white/60">
              What these projects show
            </p>
            <h2 className="text-2xl font-bold tracking-tight">
              Real products, not just screenshots
            </h2>
            <p className="text-lg leading-relaxed text-white/75">
              Each project is selected to show how I think about structure,
              visual polish, and the technical choices behind the experience.
              The focus is on shipping something useful, keeping the stack
              maintainable, and connecting design decisions to how people
              actually use the product.
            </p>
          </section>

          <section className="space-y-4">
            <p className="text-sm font-semibold uppercase tracking-wide text-white/60">
              Selection criteria
            </p>
            <h2 className="text-2xl font-bold tracking-tight">
              Fast, responsive, and production-ready
            </h2>
            <p className="text-lg leading-relaxed text-white/75">
              The strongest entries balance frontend quality with enough backend
              depth to demonstrate product thinking. That usually means a clean
              React or Next.js interface, sensible data flow, and enough
              context for someone reviewing the work to understand the problem,
              the solution, and the tradeoffs that shaped it.
            </p>
          </section>
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

        <section className="mt-14 rounded-2xl border border-white/10 bg-white/5 p-8">
          <p className="text-sm font-semibold uppercase tracking-wide text-white/60">
            What to expect from future case studies
          </p>
          <h2 className="mt-2 text-2xl font-bold tracking-tight">
            More context, more structure, and more product detail
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-white/75">
            As more work is added to the portfolio, the project pages will keep
            showing the same pattern: a clear overview, the problem being
            solved, the implementation choices that mattered, and the outcome
            those choices created. That keeps the portfolio useful for search
            engines and, more importantly, useful for the people reading it.
          </p>
        </section>

        <SiteFooter profile={profile} />
      </div>
    </section>
  );
}

export default Project;
