"use client";

import React, { useMemo } from 'react';
import FetchImage from '@/utils/fetchImage';
import { getSkillsByType, Skill } from '@/components/sections/about/SkillsData';

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
    tools: "#6cbbfd",
  };

  return (
    <div id='tech-skills-container' className="w-full flex flex-col gap-16">
      {skillCategories.map((category) => (
        <div
          className="grid md:grid-cols-[200px_1fr] gap-8 items-start"
          id={category}
          key={category}
        >
          {/* type label */}
          <div className="text-gray-400 text-lg font-bold sticky top-18">
            <button
              className="category-label cursor-pointer hover:text-white transition"
              onClick={() => scrollToSection(category)}
              style={{ color: categoryColors[category as keyof typeof categoryColors] || "#ffffff" }}
            >
              {category.toUpperCase()}
            </button>
          </div>

          {/* skills */}
          <div className="w-full flex flex-wrap gap-4">
            {skillsByType[category].map((skill: Skill) => (
              <div
                className="flex items-center gap-2 group hover:scale-105 transition-transform duration-300"
                key={skill.name}
              >
                <div className="flex items-center justify-center w-8 h-8">
                  <FetchImage
                    src={skill.icon}
                    size={24}
                    alt={`${skill.name} icon`}
                    useReactIcon={true}
                    iconColor={categoryColors[category as keyof typeof categoryColors] || "#ffffff"}
                  />
                </div>
                <span className="text-lg">{skill.name}</span>
              </div>
            ))}
          </div>
        </div>

      ))}
    </div>
  );
};

export default TechSkills;