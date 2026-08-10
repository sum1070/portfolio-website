import { promises as fs } from "fs";
import path from "path";
import { TProject, TProjectContent, TProjectResolved } from "@/lib/types";

const revalidateSeconds = 3600;
const contentDir = path.join(process.cwd(), "data", "projects");

const readContentFile = async (file: string) => {
  try {
    return await fs.readFile(path.join(contentDir, file), "utf-8");
  } catch {
    return "";
  }
};

const parseRepo = (githubUrl?: string) => {
  if (!githubUrl) return null;
  const match = /github\.com\/([^/]+)\/([^/\s]+)/.exec(githubUrl);
  if (!match) return null;
  return { owner: match[1], repo: match[2].replace(/\.git$/, "") };
};

const fetchRepoInfo = async (githubUrl?: string) => {
  const repo = parseRepo(githubUrl);
  if (!repo) return null;
  try {
    const res = await fetch(`https://api.github.com/repos/${repo.owner}/${repo.repo}`, {
      headers: { Accept: "application/vnd.github+json" },
      next: { revalidate: revalidateSeconds },
    });
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
};

const fetchRepoFile = async (githubUrl?: string, file?: string) => {
  const repo = parseRepo(githubUrl);
  if (!repo) return "";
  try {
    const path = file || "README.md";
    const res = await fetch(
      `https://raw.githubusercontent.com/${repo.owner}/${repo.repo}/HEAD/${path}`,
      { next: { revalidate: revalidateSeconds } },
    );
    if (!res.ok) return "";
    return await res.text();
  } catch {
    return "";
  }
};

export const resolveContent = async (
  project: TProject,
  content?: TProjectContent,
): Promise<string> => {
  if (!content) return "";
  if (content.source === "manual") return content.content;
  if (content.source === "file") {
    return readContentFile(content.file || `${project.slug}.md`);
  }
  if (content.source === "github-description") {
    const info = await fetchRepoInfo(project.github);
    return info?.description ?? "";
  }
  return fetchRepoFile(project.github, content.file);
};

export const resolveShortDescription = async (project: TProject): Promise<string> => {
  if (typeof project.shortDescription === "string") return project.shortDescription;
  return resolveContent(project, project.shortDescription);
};

export const resolveLastUpdate = async (project: TProject): Promise<string> => {
  if (project.lastUpdate) return project.lastUpdate;
  if (!parseRepo(project.github)) return "";
  const info = await fetchRepoInfo(project.github);
  return info?.pushed_at ? String(info.pushed_at).slice(0, 7) : "";
};

export const resolveProject = async (project: TProject): Promise<TProjectResolved> => ({
  ...project,
  shortDescription: await resolveShortDescription(project),
});
