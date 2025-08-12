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

  const categoryColors = {
    frontend: "#423c6c",
    backend: "#e2baff",
    database: "#ff8fea",
    tools: "#0c4a6e",
  };

  return (
    <div id='tech-skills-container' className="w-full flex flex-col gap-8 ">
      <h1 className={cn(
        "hidden md:block text-2xl lg:text-3xl font-bold ",
      )}>
        Skills
      </h1>
      {skillCategories.map((category) => (
        <div
          className="flex flex-col md:flex-row gap-8 lg:gap-12"
          id={category}
          key={category}
        >
          <div id='cato-labels-container' className="md:sticky px-4 lg:px-8 md:w-24 lg:w-32">
            <button
              className="text-lg font-bold cursor-pointer hover:text-white transition"
              onClick={() => scrollToSection(category)}
              style={{ color: categoryColors[category as keyof typeof categoryColors] || "#ffffff" }}
            >
              {category.toUpperCase()}
            </button>
          </div>

          <div id='skills-container' className="flex flex-wrap md:gap-2 lg:gap-4 px-2">
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
                    iconColor={categoryColors[category as keyof typeof categoryColors] || "#ffffff"}
                  />
                </div>
                <span className="text-sm md:text-base whitespace-nowrap">{skill.name}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default TechSkills;