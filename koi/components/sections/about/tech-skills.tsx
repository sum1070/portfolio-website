"use client";

import React, { useMemo } from 'react';
import FetchImage from '@/utils/fetch-images';
import { getSkillsByType, Skill, getCategoryColor } from '@/components/sections/about/skills-data';

const TechSkills = () => {
  const skillsByType = useMemo(() => getSkillsByType(), []);
  const skillCategories = Object.keys(skillsByType);

  const scrollToSection = (id: string) => {
    document.querySelector(`#${id}`)?.scrollIntoView({ behavior: 'smooth' });
  };

  const categoryDisplayNames = {
    frameworks: "Frameworks & Libraries",
    languages: "Languages",
    backend: "Backend",
    tools: "Tools"
  };

  /**
   * Hide cato name; centre section title
   * md: category name left, sticky;
   * xl: section title left
   */
  const styles = {
    container: "flex flex-col justify-center gap-4 md:gap-4 xl:gap-6 2xl:gap-8",
    sectionTitle: "text-center xl:text-left",
    categoryWrapper: "flex flex-col gap-2",
    categoryNameContainer: "md:sticky md:w-40 xl:w-56",
    categoryName: "hidden md:block font-bold cursor-pointer hover:text-white transition text-lg md:text-lg xl:pb-2 2xl:pb-4 xl:flex-row whitespace-nowrap",
    skillsContainer: "flex flex-row flex-wrap px-2 gap-2 md:gap-4 2xl:gap-8",
    skillItem: "flex items-center bg-white/20 rounded-md px-2 py-1 hover:scale-105 xl:hover:scale-108 transition-transform duration-200",
    skillLogo: "flex items-center justify-center mr-2 w-4 h-4 md:w-6 md:h-6 lg:w-7 lg:h-7 2xl:w-8 2xl:h-8",
    skillText: "whitespace-nowrap text-sm md:text-base xl:text-base 2xl:text-lg"
  };

  return (
    <div id="category-container" className={styles.container}>
      <h2 id="skills-section-title" className={styles.sectionTitle}>
        My Skills
      </h2>

      {skillCategories.map((category) => {
        const categoryColor = getCategoryColor(category);
        const displayName = categoryDisplayNames[category as keyof typeof categoryDisplayNames] ||
          category.charAt(0).toUpperCase() + category.slice(1);

        return (
          <div className={styles.categoryWrapper} id={category} key={category}>
            {/* Category name */}
            <div id="category-name-container" className={styles.categoryNameContainer}>
              <button
                id="category-name"
                className={styles.categoryName}
                onClick={() => scrollToSection(category)}
                style={{ color: categoryColor }}
              >
                {displayName.toUpperCase()}
              </button>
            </div>

            {/* Skills in the category */}
            <div id="skills-container" className={styles.skillsContainer}>
              {skillsByType[category].map((skill: Skill) => (
                <div className={styles.skillItem} key={skill.name}>
                  <div id="skills-logo" className={styles.skillLogo}>
                    <FetchImage
                      src={skill.icon}
                      size={24}
                      alt={`${skill.name} icon`}
                      useReactIcon={true}
                      iconColor={categoryColor}
                    />
                  </div>
                  <span className={styles.skillText}>{skill.name}</span>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default TechSkills;