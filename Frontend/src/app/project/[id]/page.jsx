import ProjectShowcase from "@/components/pages/project/ProjecShowCasePage";

export default async function ProjectDetailRoute({ params }) {
  const resolvedParams = await params;
  const projectId = Number(resolvedParams.id);
  return <ProjectShowcase projectId={projectId} />;
}
