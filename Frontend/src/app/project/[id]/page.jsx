import ProjectShowcase from "@/components/pages/project/ProjecShowCasePage";

export default function ProjectDetailRoute({ params }) {
  const projectId = Number(params.id);
  return <ProjectShowcase projectId={projectId} />;
}
