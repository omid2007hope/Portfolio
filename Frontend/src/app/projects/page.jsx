import Project from "@/components/pages/project/ProjectPage";
import { getProfile, getProjects } from "@/lib/api";

export default async function ProjectsRoute() {
  const [projects, profile] = await Promise.all([getProjects(), getProfile()]);
  return <Project projects={projects} profile={profile} />;
}
