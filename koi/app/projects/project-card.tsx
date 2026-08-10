"use client";
import React, { useState } from "react";
import { NekoSleep, TransitionLink } from "@/components";
import { LiquidGlass } from "@/components/nav-button/liquid-glass";
import { TProjectResolved } from "@/lib/types";
import { cn, contactImages } from "@/utils";

export const glassCN =
  "bg-white/20 backdrop-blur-md border border-nice-purple1/60 rounded-2xl shadow-lg shadow-nice-purple1/10";

export const TagPill = ({ label, color }: { label: string; color?: string }) => (
  <span
    className={cn(
      "px-2 py-0.5 rounded-md text-xs font-titillium-web whitespace-nowrap",
      "bg-white/30 border border-nice-purple1/40",
    )}
    style={color ? { color, borderColor: color } : undefined}
  >
    {label}
  </span>
);

interface ProjectCardProps {
  project: TProjectResolved;
  background?: string;
  darkBackground?: string;
}

const ProjectCard = ({ project, background, darkBackground }: ProjectCardProps) => {
  const previewImage = project.previewImg[0];

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isHovering) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePosition({ x, y });
  };

  return (
    <div
      id="project-card"
      className={cn(
        glassCN,
        "rounded-4xl",
        "relative group w-full max-w-sm overflow-hidden flex flex-col",
        "transition-shadow duration-300 ease-in-out hover:shadow-xl",
      )}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div
        id="project-card-BG"
        className={cn("absolute inset-0 pointer-events-none dark:hidden", background)}
      />
      <div
        id="project-card-BG-dark"
        className={cn("absolute inset-0 pointer-events-none hidden dark:block", darkBackground)}
      />
      <div className="absolute inset-0 z-10 pointer-events-none">
        {LiquidGlass(isHovering, mousePosition)}
      </div>

      <div id="project-card-content" className="flex flex-col grow">
        <TransitionLink href={`/projects/${project.slug}`} className="relative flex flex-col grow">
          {previewImage ? (
            <img
              src={previewImage}
              alt={`${project.title} preview`}
              className="w-full h-40 object-cover"
            />
          ) : (
            // fallback preview when no screenshot yet
            <div className="w-full h-40 gradient-ssr flex items-center justify-center">
              <NekoSleep className="w-16 opacity-70" />
            </div>
          )}
          <div id="project-card-body" className="relative z-20 p-4 pb-2 text-center font-titillium-web">
            <h2 className="text-xl md:text-2xl">{project.title}</h2>
            <p className="text-sm md:text-base opacity-90">{project.shortDescription}</p>
          </div>
        </TransitionLink>

        <div id="project-card-footer" className="relative z-20 p-4 pt-2 flex flex-col gap-2 items-center">
          <div className="flex flex-wrap justify-center gap-1.5">
            {project.tags.map((tag) => (
              <TagPill key={tag} label={tag} />
            ))}
          </div>
          <div className="flex items-center gap-4 text-sm font-titillium-web">
            {project.github ? (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 hover:text-purple2 transition-colors"
              >
                <img src={contactImages.github} alt="GitHub" className="w-4 h-4" />
                GitHub
              </a>
            ) : (
              <span className="flex items-center gap-1.5 opacity-60">
                <img src={contactImages.github} alt="GitHub" className="w-4 h-4" />
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
                Live demo
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
