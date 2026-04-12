import PageSection from "@/components/layout/PageSection";
import SiteFooter from "@/components/layout/SiteFooter";
import Panel from "@/components/ui/Panel";
import ProjectsGrid from "@/features/projects/components/ProjectsGrid";
import ProjectsHero from "@/features/projects/components/ProjectsHero";
import { PROJECTS_FOOTER_CALLOUT } from "@/features/projects/constants/projectsContent";

function ProjectsPage({ projects, profile }) {
  return (
    <PageSection>
        <ProjectsHero />
        <ProjectsGrid projects={projects} />

        <Panel className="mt-14 p-8">
          <p className="text-sm font-semibold uppercase tracking-wide text-white/60">
            {PROJECTS_FOOTER_CALLOUT.eyebrow}
          </p>
          <h2 className="mt-2 text-2xl font-bold tracking-tight">
            {PROJECTS_FOOTER_CALLOUT.title}
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-white/75">
            {PROJECTS_FOOTER_CALLOUT.description}
          </p>
        </Panel>

        <SiteFooter profile={profile} />
    </PageSection>
  );
}

export default ProjectsPage;
