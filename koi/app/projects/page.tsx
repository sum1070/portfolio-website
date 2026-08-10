import { projects } from "@/data/projects";
import { resolveProject } from "@/lib/project-content";
import ProjectsList from "./projects-list";

const Project = async () => {
  const resolvedProjects = await Promise.all(
    projects.map((project) => resolveProject(project)),
  );

  return <ProjectsList projects={resolvedProjects} />;
};

export default Project;
