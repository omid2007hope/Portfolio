import Panel from "@/components/ui/Panel";
import {
  PROJECTS_HERO_COPY,
  PROJECTS_INTRO_PANELS,
} from "@/features/projects/constants/projectsContent";

function ProjectsHero() {
  return (
    <>
      <div className="mb-10 text-center">
        <h1 className="text-3xl font-extrabold sm:text-4xl">
          {PROJECTS_HERO_COPY.title}
        </h1>
        <p className="mt-2 text-lg text-white/70">
          {PROJECTS_HERO_COPY.description}
        </p>
      </div>

      <div className="mx-auto mb-12 grid max-w-5xl gap-8 lg:grid-cols-2">
        {PROJECTS_INTRO_PANELS.map((panel) => (
          <Panel key={panel.title} className="p-6">
            <p className="text-sm font-semibold uppercase tracking-wide text-white/60">
              {panel.eyebrow}
            </p>
            <h2 className="mt-2 text-2xl font-bold tracking-tight">
              {panel.title}
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-white/75">
              {panel.description}
            </p>
          </Panel>
        ))}
      </div>
    </>
  );
}

export default ProjectsHero;
