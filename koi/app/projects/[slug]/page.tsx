import { Markdown, Navbar, PinkBackground, ScrollToTop } from "@/components";
import { cn, contactImages, pageIDs } from "@/utils";
import { notFound } from "next/navigation";
import { getProjectBySlug, projects } from "@/data/projects";
import {
  resolveContent,
  resolveLastUpdate,
  resolveShortDescription,
} from "@/lib/project-content";
import { glassCN, TagPill } from "../project-card";
import { getSkillColor } from "@/components/sections/about/skills-data";
import { slugify } from "@/components/ui/markdown";
import WriteupToc, { TocItem } from "./writeup-toc";

const getTocItems = (markdown: string): TocItem[] => {
  const items: TocItem[] = [];
  let inFence = false;
  for (const line of markdown.replace(/\r\n/g, "\n").split("\n")) {
    if (line.trim().startsWith("```")) {
      inFence = !inFence;
      continue;
    }
    if (inFence) continue;
    const match = /^(#{2,3})\s+(.*)$/.exec(line);
    if (match) {
      const text = match[2].replace(/[*_`]/g, "").trim();
      items.push({ id: slugify(text), text, level: match[1].length });
    }
  }
  return items;
};

export const generateStaticParams = () =>
  projects.map((project) => ({ slug: project.slug }));

const ProjectPage = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const [shortDescription, writeup, lastUpdate] = await Promise.all([
    resolveShortDescription(project),
    resolveContent(project, project.writeup),
    resolveLastUpdate(project),
  ]);
  const tocItems = getTocItems(writeup);

  return (
    <div
      className={cn("flex overflow-hidden min-w-dvw min-h-dvh relative")}
      id={`${pageIDs.projects}-${project.slug}`}
    >
      <Navbar currentPage={pageIDs.projects} />
      <PinkBackground />
      <div className="w-full pt-24 pb-40 px-8 sm:px-12 md:px-16 max-w-5xl mx-auto relative z-10 flex flex-col gap-4">
        <h1 className="font-titillium-web">{project.title}</h1>

        {shortDescription && (
          <p id="project-description" className="-mt-2 text-xs md:text-sm opacity-70 italic">
            {shortDescription}
          </p>
        )}

        <div id="project-meta" className="flex flex-wrap items-center gap-2 md:gap-3">
          {project.tags.map((tag) => (
            <TagPill key={tag} label={tag} />
          ))}
          {project.technologies.length > 0 && (
            <span className="opacity-70" aria-hidden={true}>
              •
            </span>
          )}
          {project.technologies.map((tech) => (
            <TagPill key={tech} label={tech} color={getSkillColor(tech)} />
          ))}
          {lastUpdate && (
            <span id="project-last-update" className="ml-auto text-sm md:text-base">
              Last update: {lastUpdate}
            </span>
          )}
        </div>

        <div id="project-links" className="flex items-center gap-6">
          {project.github ? (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-purple2 transition-colors"
            >
              <img src={contactImages.github} alt="GitHub" className="w-5 h-5" />
              GitHub
              <span aria-hidden={true}>↗</span>
            </a>
          ) : (
            <span className="flex items-center gap-2 opacity-60">
              <img src={contactImages.github} alt="GitHub" className="w-5 h-5" />
              Private
            </span>
          )}
          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-2 hover:text-purple2 transition-colors"
            >
              Live demo <span aria-hidden={true}>↗</span>
            </a>
          )}
        </div>

        <hr className="border-nice-purple1/40 my-2" />

        {/* gallery removed: previewImg[] is only the card preview, the write-up owns this page
        {project.previewImg.length > 0 && (
          <div
            id="project-gallery"
            className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-2"
          >
            {project.previewImg.map((src) => (
              <img
                key={src}
                src={src}
                alt={`${project.title} screenshot`}
                className={cn(glassCN, "snap-center max-h-80 object-cover")}
              />
            ))}
          </div>
        )} */}

        {tocItems.length > 1 && <WriteupToc items={tocItems} />}

        {writeup && <Markdown content={writeup} className="px-2 md:px-4" />}
      </div>
      <ScrollToTop />
    </div>
  );
};

export default ProjectPage;