import { TProject } from "@/lib/types";
import portfolioWebsite from "./portfolio-website";
import decoguide from "./decoguide";
import xtsZodiacBlockCipher from "./xts-zodiac-block-cipher";
import breastCancerTreatmentResponse from "./breast-cancer-treatment-response";
import startUpPage from "./browser-startup";

const allProjects: TProject[] = [
  portfolioWebsite,
  decoguide,
  xtsZodiacBlockCipher,
  breastCancerTreatmentResponse,
  startUpPage,
];

export const projects: TProject[] = allProjects.filter(
  (project) => project.visible,
);

export const getAllTags = (): string[] => [
  ...new Set(projects.flatMap((project) => project.tags)),
];

// no writeup
export const hasProjectPage = (project: Pick<TProject, "writeup">): boolean =>
  project.writeup !== undefined;

export const projectsWithPage: TProject[] = projects.filter(hasProjectPage);

export const getProjectBySlug = (slug: string): TProject | undefined =>
  projectsWithPage.find((project) => project.slug === slug);
