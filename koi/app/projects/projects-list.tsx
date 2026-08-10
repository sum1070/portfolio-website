"use client";
import { Navbar, PinkBackground, SleepZZZ } from "@/components";
import { cn, pageIDs } from "@/utils";
import { useState } from "react";
import { TProjectResolved } from "@/lib/types";
import ProjectCard, { glassCN } from "./project-card";

const ProjectsList = ({ projects }: { projects: TProjectResolved[] }) => {
  const pageID = pageIDs.projects;
  const allTags = [...new Set(projects.flatMap((project) => project.tags))];

  // empty selection = "All"
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const isAll = selectedTags.length === 0;

  const filteredProjects = isAll
    ? projects
    : projects.filter((project) =>
        project.tags.some((tag) => selectedTags.includes(tag)),
      );

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag],
    );
  };

  const tagButtonCN = cn(
    glassCN,
    "px-5 py-1 rounded-xl font-titillium-web text-lg md:text-xl cursor-pointer",
    "transition-all duration-200 hover:bg-nice-purple1/25",
  );

  return (
    <div className={cn("flex overflow-hidden min-w-dvw min-h-dvh relative")} id={pageID}>
      <Navbar currentPage={pageID} />
      <PinkBackground />
      <div className="w-full pt-24 pb-40 px-8 sm:px-12 md:px-16 max-w-7xl mx-auto relative z-10">
        <h1 className="font-titillium-web text-center mb-8 md:mb-10">Project</h1>

        {/* tag filters: multi-select; selected highlighted, others dimmed */}
        {projects.length > 0 && (
          <div
            id="tag-filters"
            className="flex flex-wrap justify-center gap-3 md:gap-8 mb-10 md:mb-14"
          >
            <button
              id="tag-all"
              onClick={() => setSelectedTags([])}
              className={cn(tagButtonCN, !isAll && "opacity-40")}
            >
              All
            </button>
            {allTags.map((tag) => {
              const isSelected = selectedTags.includes(tag);
              return (
                <button
                  key={tag}
                  onClick={() => toggleTag(tag)}
                  className={cn(
                    tagButtonCN,
                    isSelected && "bg-white/50 border-nice-purple2 scale-105",
                    !isAll && !isSelected && "opacity-40",
                  )}
                >
                  {tag}
                </button>
              );
            })}
          </div>
        )}

        {/* clear filter: plain text, left aligned */}
        {!isAll && (
          <button
            id="clear-filter"
            onClick={() => setSelectedTags([])}
            className={cn(
              "block -mt-6 mb-8 font-titillium-web text-sm md:text-base",
              "underline underline-offset-2 cursor-pointer hover:text-purple2 transition-colors",
            )}
          >
            Clear filter
          </button>
        )}

        {/* project grid / empty state */}
        {projects.length === 0 ? (
          <div
            id="projects-empty"
            className="pt-16 gap-6 flex flex-col items-center justify-center text-center"
          >
            <span className="stairs" />
            <h2>Cool stuff coming soon</h2>
            <h3>
              <span className="inline-flex items-center gap-x-2">
                Working slowly and I'm sleepy...
                <SleepZZZ className="-ml-3 md:-ml-2 w-8 md:w-12 xl:-ml-4 xl:w-20 inline-block border-0 " />
              </span>
            </h3>
          </div>
        ) : (
          <div
            id="projects-grid"
            className={cn(
              "grid grid-cols-1 gap-10 justify-items-center",
              "md:grid-cols-2 xl:grid-cols-4 md:gap-8",
            )}
          >
            {filteredProjects.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectsList;
