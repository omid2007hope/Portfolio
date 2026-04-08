/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import SiteFooter from "@/components/layout/SiteFooter";
import { Sparkle } from "lucide-react";

function ProjectShowcase({ project, profile }) {
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
          <aside className="space-y-10">
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wide text-white/60">
                Tech Stack
              </h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {(project.techStack || []).map((techItem) => (
                  <span
                    key={techItem}
                    className="rounded-lg border border-white/10 bg-white/10 px-4 py-1 text-sm font-semibold"
                  >
                    {techItem}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-white/60">
                Details
              </h3>

              <div className="space-y-4">
                <DetailCard label="Role" value={project.role || "Developer"} />
                <DetailCard label="Duration" value={project.duration || "In progress"} />
                <DetailCard label="Status" value={project.status || "published"} />
              </div>
            </div>

            <div className="space-y-4 pt-4">
              <a
                href={project.liveDemoUrl || undefined}
                target="_blank"
                rel="noopener noreferrer"
                className={`block w-full rounded-xl py-3 text-center font-semibold transition ${
                  project.liveDemoUrl
                    ? "bg-blue-600 hover:bg-blue-700"
                    : "cursor-not-allowed border border-white/10 bg-white/5 opacity-70"
                }`}
                aria-disabled={!project.liveDemoUrl}
              >
                {project.liveDemoUrl ? "View Live Site" : "Live site coming soon"}
              </a>

              <a
                href={project.repositoryUrl || undefined}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full rounded-xl border border-white/10 bg-white/10 py-3 text-center font-semibold transition hover:bg-white/20"
              >
                View on GitHub
              </a>
            </div>
          </aside>

          <div className="space-y-14 lg:col-span-2">
            <section>
              <h2 className="mb-4 text-2xl font-bold">Overview</h2>
              <p className="leading-relaxed text-white/80">
                {project.overview ||
                  "This project was built to feel clear, fast, and ready for real users."}
              </p>
            </section>

            <section>
              <h2 className="mb-4 text-2xl font-bold">Problem, Approach, Outcome</h2>
              <p className="leading-relaxed text-white/80">
                {project.challengesAndSolutions ||
                  "Challenge and solution notes have not been added yet."}
              </p>

              {!!project.showcaseImages?.length && (
                <div className="my-8 grid w-full grid-cols-1 gap-6 md:grid-cols-3">
                  {project.showcaseImages.map((image, index) => (
                    <img
                      key={`${image.url}-${index}`}
                      src={image.url}
                      alt={image.alt || `${project.title} showcase ${index + 1}`}
                      className="h-64 w-full rounded-xl bg-slate-700 object-cover"
                    />
                  ))}
                </div>
              )}

              {project.highlightQuote ? (
                <div className="mt-6 rounded-xl border border-blue-600/30 bg-blue-700/20 p-6">
                  <p className="font-semibold leading-relaxed text-blue-300">
                    &ldquo;{project.highlightQuote}&rdquo;
                  </p>
                </div>
              ) : null}

              <p className="mt-6 leading-relaxed text-white/80">
                {project.improvements || "Additional improvements have not been added yet."}
              </p>
            </section>
          </div>
        </div>

        <SiteFooter profile={profile} />
      </div>
    </div>
  );
}

function DetailCard({ label, value }) {
  return (
    <div className="flex gap-3">
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600">
        <Sparkle />
      </div>
      <div>
        <p className="text-xs font-medium uppercase text-white/60">{label}</p>
        <p className="font-semibold">{value}</p>
      </div>
    </div>
  );
}

export default ProjectShowcase;
