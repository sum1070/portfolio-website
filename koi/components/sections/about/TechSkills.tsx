"use client";

import React, { useMemo } from 'react';
import FetchImage from '@/utils/fetchImage';
import { getSkillsByType, Skill } from '@/components/sections/about/SkillsData';
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

  const xlScreen = {
    title: "xl:text-3xl xl:text-left ",
    catoName: "xl:gap-12 xl:flex-row ",
    skills: "xl:text-lg ",

  }
  const mdScreen = {
    title: "hidden md:block text-center ",
    catoName: "text-lg ",
    skills: "md:text-base ",
  }

  const screen = {
    catoName: "text-lg ",
    title: "hidden ",
    skills: "text-sm ",
  }

  return (
    <div id='category-container' className="flex flex-col gap-4 xl:gap-8 justify-center ">
      <h2
        id='skills-section-title'
        className={cn(xlScreen.title, mdScreen.title, screen.title, "")}>
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

          <div id='skills-container' className="flex flex-row flex-wrap px-2">
            {skillsByType[category].map((skill: Skill) => (
              <div
                className={cn(
                  "flex items-center bg-white/20 rounded-md px-2 py-1",
                  "hover:scale-105 xl:hover:scale-108 transition-transform duration-200"
                )}
                key={skill.name}
              >
                <div id='skills-logo' className="flex items-center justify-center w-8 h-8 mr-2">
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