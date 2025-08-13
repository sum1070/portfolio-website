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

  const largeScreen = {
    title: "xl:text-3xl ",
    cato: "xl:gap-12 xl:flex-row ",
    skills: "xl:text-lg ",

  }

  return (
    <div id='tech-skills-container' className=" flex flex-col gap-8 justify-center  ">
      <h1
        id='skills-title'
        className={cn(
          "hidden md:block text-2xl font-bold ",
        )}>
        Skills
      </h1>
      {skillCategories.map((category, i) => (
        <div
          className={cn(
            "flex flex-col gap-8 "
          )}
          id={category}
          key={category}
        >
          <div id='labels-container' className="md:sticky px-4 xl:px-8 md:w-24 xl:w-32">
            <button
              id='category-label'
              className="text-lg font-bold cursor-pointer hover:text-white transition"
              onClick={() => scrollToSection(category)}
              style={{ color: getColor(i) }}
            >
              {category.toUpperCase()}
            </button>
          </div>

          <div id='skills-container' className="flex flex-wrap md:gap-2 xl:gap-4 px-2">
            {skillsByType[category].map((skill: Skill) => (
              <div
                className={cn(
                  "flex items-center bg-white/20 rounded-md px-2 py-1",
                  "hover:scale-105 transition-transform duration-300"
                )}
                key={skill.name}
              >
                <div className="flex items-center justify-center w-8 h-8 mr-2">
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
                    "text-sm md:text-base whitespace-nowrap",
                    largeScreen.skills,
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