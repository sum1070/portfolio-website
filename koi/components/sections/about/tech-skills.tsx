"use client";

import React, { useMemo } from 'react';
import FetchImage from '@/utils/fetch-images';
import { getSkillsByType, Skill } from '@/components/sections/about/skills-data';
import { cn } from '@/utils';

const TechSkills = () => {
  const skillsByType = useMemo(() => getSkillsByType(), []);
  const skillCategories = Object.keys(skillsByType);

  const scrollToSection = (id: string) => {
    document.querySelector(`#${id}`)?.scrollIntoView({ behavior: 'smooth' });
  };

  // must use 0c4a6e for tools
  const titleColors = [
    "#112C7B",
    "#0F3677",
    "#0E4072",
    "#0c4a6e",
  ]

  const getColor = (i: number): string => {
    return titleColors[i % titleColors.length];
  }

  // h1,h2,h3 size settings in globals.css
  const xlScreen = {
    title: "xl:text-left xl:block ",
    catoName: "xl:pb-2 2xl:pb-4 xl:flex-row ",
    skills: "xl:text-base 2xl:text-lg ",
    overallGapY: "2xl:gap-8 xl:gap-6",
    skillsContainer: "2xl:gap-8 ",
    logo: "lg:w-7 lg:h-7 2xl:w-8 2xl:h-8 ",

  }

  const mdScreen = {
    title: "text-center ",
    catoName: "text-lg ",
    skills: "md:text-base ",
    // overallGapY: " ",
    skillsContainer: "md:gap-4 ",
    logo: "md:w-6 md:h-6 ",
  }

  const screen = {
    catoName: "text-lg ",
    title: "hidden ",
    skills: "text-sm ",
    overallGapY: "gap-4 ",
    skillsContainer: "gap-2 ",
    logo: "w-4 h-4 ",
  }

  return (
    <div
      id='category-container'
      className={cn(
        "flex flex-col justify-center ",
        xlScreen.overallGapY,
        screen.overallGapY,
      )}>
      <h2
        id='skills-section-title'
        className={cn(xlScreen.title, mdScreen.title, screen.title, "")}
      >
        Skills
      </h2>
      {/* skill labels */}
      {skillCategories.map((category, i) => (
        <div
          className={cn(
            "flex flex-col gap-2 "
          )}
          id={category}
          key={category}
        >
          {/* category name e.g. frameworks */}
          <div id='category-name-container' className=" md:sticky px-4 xl:px-8 md:w-24 xl:w-32">
            <button
              id='category-name'
              className={cn(
                "font-bold cursor-pointer hover:text-white transition",
                xlScreen.catoName,
                mdScreen.catoName,
                screen.catoName
              )}
              onClick={() => scrollToSection(category)}
              style={{ color: getColor(i) }}
            >
              {category.toUpperCase()}
            </button>
          </div>
          {/* skills in the category */}
          <div
            id='skills-container'
            className={cn(
              "flex flex-row flex-wrap px-2",
              xlScreen.skillsContainer,
              mdScreen.skillsContainer,
              screen.skillsContainer,
            )}
          >
            {skillsByType[category].map((skill: Skill) => (
              <div
                className={cn(
                  "flex items-center bg-white/20 rounded-md px-2 py-1",
                  "hover:scale-105 xl:hover:scale-108 transition-transform duration-200"
                )}
                key={skill.name}
              >
                <div
                  id='skills-logo'
                  className={cn(
                    "flex items-center justify-center mr-2",
                    xlScreen.logo,
                    mdScreen.logo,
                    screen.logo,
                  )}
                >
                  <FetchImage
                    src={skill.icon}
                    size={24}
                    alt={`${skill.name} icon`}
                    useReactIcon={true}
                    iconColor={getColor(i)}
                  />
                </div>
                <span
                  className={cn(
                    "whitespace-nowrap",
                    xlScreen.skills,
                    mdScreen.skills,
                    screen.skills
                  )}>
                  {skill.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default TechSkills;