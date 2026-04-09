import { Sparkle } from "lucide-react";
import TagList from "@/components/ui/TagList";
import { classNames } from "@/utils/classNames";

function ProjectDetailSidebar({ project }) {
  return (
    <aside className="space-y-10">
      <div>
        <h3 className="text-sm font-semibold uppercase tracking-wide text-white/60">
          Tech Stack
        </h3>
        <TagList
          items={project.techStack || []}
          className="mt-3"
          itemClassName="px-4 py-1 text-sm font-semibold"
        />
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
        <SidebarActionLink href={project.liveDemoUrl}>
          {project.liveDemoUrl ? "View Live Site" : "Live site coming soon"}
        </SidebarActionLink>

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

function SidebarActionLink({ href, children }) {
  const isEnabled = Boolean(href);

  return (
    <a
      href={href || undefined}
      target="_blank"
      rel="noopener noreferrer"
      className={classNames(
        "block w-full rounded-xl py-3 text-center font-semibold transition",
        isEnabled
          ? "bg-blue-600 hover:bg-blue-700"
          : "cursor-not-allowed border border-white/10 bg-white/5 opacity-70",
      )}
      aria-disabled={!isEnabled}
    >
      {children}
    </a>
  );
}

export default ProjectDetailSidebar;
