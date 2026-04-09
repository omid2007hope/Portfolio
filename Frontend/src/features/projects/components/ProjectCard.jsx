/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import Panel from "@/components/ui/Panel";
import TagList from "@/components/ui/TagList";
import { getProjectPath } from "@/lib/seo";
import { classNames } from "@/utils/classNames";

function ProjectCard({ project }) {
  return (
    <Panel className="p-5 transition hover:bg-white/10">
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

        <TagList items={project.techStack || []} className="mt-4" />
      </Link>

      <div className="mt-5 flex gap-4">
        <ProjectActionLink href={project.liveDemoUrl}>
          {project.liveDemoUrl ? "Live Demo" : "Live Demo (coming soon)"}
        </ProjectActionLink>

        <a
          href={project.repositoryUrl || undefined}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 rounded-lg border border-white/10 bg-white/10 px-4 py-2 text-center text-sm font-semibold hover:bg-white/20"
        >
          Source
        </a>
      </div>
    </Panel>
  );
}

function ProjectActionLink({ href, children }) {
  const isEnabled = Boolean(href);

  return (
    <a
      href={href || undefined}
      target="_blank"
      rel="noopener noreferrer"
      className={classNames(
        "flex-1 rounded-lg px-4 py-2 text-center text-sm font-semibold",
        isEnabled
          ? "bg-blue-600 hover:bg-blue-700"
          : "cursor-not-allowed border border-white/10 bg-white/5 opacity-60",
      )}
      aria-disabled={!isEnabled}
      tabIndex={isEnabled ? undefined : -1}
    >
      {children}
    </a>
  );
}

export default ProjectCard;
