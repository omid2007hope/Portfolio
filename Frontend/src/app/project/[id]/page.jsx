import ProjectShowcase from "@/components/pages/project/ProjecShowCasePage";
import { getProfile, getProject } from "@/lib/api";

export default async function ProjectDetailRoute({ params }) {
  const resolvedParams = await params;
  const [project, profile] = await Promise.all([
    getProject(resolvedParams.id),
    getProfile(),
  ]);

  return <ProjectShowcase project={project} profile={profile} />;
}
