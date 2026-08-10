import { TProject } from "@/lib/types";
import portfolioWebsite from "./portfolio-website";

const allProjects: TProject[] = [portfolioWebsite];

export const projects: TProject[] = allProjects.filter(
  (project) => project.visible,
);

export const getAllTags = (): string[] => [
  ...new Set(projects.flatMap((project) => project.tags)),
];

export const getProjectBySlug = (slug: string): TProject | undefined =>
  projects.find((project) => project.slug === slug);
