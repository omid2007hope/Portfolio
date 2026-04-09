import EmptyState from "@/components/ui/EmptyState";
import ProjectCard from "@/features/projects/components/ProjectCard";

function ProjectsGrid({ projects = [] }) {
  if (!projects.length) {
    return (
      <EmptyState>No projects have been added to the backend yet.</EmptyState>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  );
}

export default ProjectsGrid;
