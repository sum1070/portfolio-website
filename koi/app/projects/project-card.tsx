"use client";
import React, { useState } from "react";
import { NekoSleep, TransitionLink } from "@/components";
import { LiquidGlass } from "@/components/nav-button/liquid-glass";
import { TProjectResolved } from "@/lib/types";
import { hasProjectPage } from "@/data/projects";
import { getSkillColor } from "@/components/sections/about/skills-data";
import { cn, contactImages } from "@/utils";

export const glassCN =
  "bg-white/20 backdrop-blur-md border border-nice-purple1/60 rounded-2xl shadow-lg shadow-nice-purple1/10";

const urlCN =
  "text-purple2 dark:text-pale-purple2 underline underline-offset-2 hover:text-nice-purple1 transition-colors";

// Preview image cn
const previewCN = "w-full shrink-0 aspect-[2/1] max-h-32 xl:max-h-40";

// "Writeup" button: the link's gradient shows through its p-0.5 as a border around the inner fill,
// rounded-full on both keeps the two curves concentric
const writeupLinkCN = cn(
  "rounded-full p-0.5 shadow-md shadow-nice-purple1/20",
  "bg-linear-to-r from-pink3 to-blue2 dark:from-nice-purple3 dark:to-deep-blue0",
  // stretched link: ::after fills the card (nearest positioned ancestor), so the whole card is one link and one tab stop
  "after:absolute after:inset-0",
  "focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-nice-purple2",
);

// inner fill turns translucent on card hover so the gradient tints through
const writeupFillCN = cn(
  "flex items-center gap-1.5 rounded-full px-5 py-1.5",
  "font-semibold text-sm md:text-base text-nice-purple2",
  "bg-pale-purple0 dark:bg-dark-black transition-colors duration-300",
  "group-hover:bg-pale-purple0/60 dark:group-hover:bg-dark-black/60",
);

export const TagPill = ({ label, color }: { label: string; color?: string }) => (
  <span
    className={cn(
      "px-2 py-0.5 rounded-md text-xs font-titillium-web whitespace-nowrap",
      "bg-white/30 border border-nice-purple1/40",
      // Tag pill dark colors: page background (pale-purple1 is dark-black in dark mode)
      !color && "dark:bg-pale-purple1/70 dark:text-pale-purple0 dark:border-nice-purple1",
      // Tech pill colors
      color && "text-(--pill-color) border-(--pill-color)",
      color && "dark:text-Mauve dark:border-pinkWave1 dark:bg-pinkWave2/60",
    )}
    style={color ? ({ "--pill-color": color } as React.CSSProperties) : undefined}
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
  const hasPage = hasProjectPage(project);
  // smaller font size for long titles
  const isLongTitle = project.title.length > 30;

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isHovering) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePosition({ x, y });
  };

  const cardBody = (
    <>
      {previewImage ? (
        <img
          src={previewImage}
          alt={`${project.title} preview`}
          className={cn(previewCN, "object-cover")}
        />
      ) : (
        // fallback preview when no screenshot yet
        <div className={cn(previewCN, "gradient-ssr flex items-center justify-center")}>
          <NekoSleep className="w-12 md:w-14 opacity-70" />
        </div>
      )}
      <div id="project-card-body" className="relative z-20 p-4 pb-2 text-center font-titillium-web">
        <h2
          className={cn(
            "text-balance mb-2",
            isLongTitle ? "text-lg! md:text-xl! xl:text-2xl! leading-snug" : "text-xl md:text-2xl",
          )}
        >
          {/* card-only project that opts in with linkTitle */}
          {!hasPage && project.linkTitle && project.demo ? (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="underline-offset-4 hover:underline focus-visible:underline"
            >
              {project.title}
            </a>
          ) : (
            project.title
          )}
        </h2>
        <p className="text-sm md:text-base opacity-90">
          {project.shortDescription}
        </p>
        {/* card-only project: demo link lives in the description, on its own line */}
        {!hasPage && project.demo && (
          <p className="mt-3 text-sm md:text-base">
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(urlCN, "whitespace-nowrap")}
            >
              Live demo <span aria-hidden={true}>↗</span>
            </a>
          </p>
        )}
      </div>
    </>
  );

  return (
    <div
      id="project-card"
      className={cn(
        glassCN,
        "rounded-4xl",
        "relative group w-full max-w-md overflow-hidden flex flex-col",
        "transition-shadow duration-300 ease-in-out",
        // only cards with a writeup react to hover, so hover means "clickable"
        hasPage && "hover:shadow-xl",
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
        <div className="relative flex flex-col grow">{cardBody}</div>

        {/* not `relative`: the writeup link's ::after must reach past the footer to the card.
            z-20 still applies because the footer is a flex item */}
        <div id="project-card-footer" className="z-20 p-4 pt-2 flex flex-col gap-2 items-center">
          {hasPage && (
            <TransitionLink
              href={`/projects/${project.slug}`}
              aria-label={`Writeup: ${project.title}`}
              className={cn(writeupLinkCN, "mb-1")}
            >
              <span className={writeupFillCN}>
                Writeup
                <span
                  aria-hidden={true}
                  className="transition-transform duration-300 motion-safe:group-hover:translate-x-1"
                >
                  →
                </span>
              </span>
            </TransitionLink>
          )}
          <div className="flex flex-wrap justify-center gap-1.5">
            {project.tags.map((tag) => (
              <TagPill key={tag} label={tag} />
            ))}
          </div>
          {project.technologies.length > 0 && (
            <div id="project-card-tech" className="flex flex-wrap justify-center gap-1.5">
              {project.technologies.map((tech) => (
                <TagPill key={tech} label={tech} color={getSkillColor(tech)} />
              ))}
            </div>
          )}
          {/* private repos show nothing, so the row only renders when it has a link.
              relative z-10 on these links lifts them above the writeup link's ::after */}
          {(project.github || (hasPage && project.demo)) && (
            <div className="flex items-center gap-4 text-sm font-titillium-web">
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative z-10 flex items-center gap-1.5 hover:text-purple2 transition-colors"
                >
                  <img src={contactImages.github} alt="GitHub" className="w-4 h-4" />
                  GitHub
                </a>
              )}
              {hasPage && project.demo && (
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(urlCN, "relative z-10")}
                >
                  Live demo <span aria-hidden={true}>↗</span>
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
