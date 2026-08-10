// Import skills data from the central data.json file
import skillsJson from "@/data/data.json";

export interface Skill {
  name: string;
  type: string;
  icon: string;
  show?: boolean;
}

// object to hold skills grouped by category
export interface SkillsByType {
  [key: string]: Skill[];
}

export const SKILL_COLORS = {
  languages: "var(--color-deep-blue0)",
  frameworks: "var(--color-deep-blue1)",
  backend: "var(--color-deep-blue2)",
  tools: "var(--color-deep-blue3)",
};

/**
 * Groups all skills from data.json by their type/category
 * @returns An object with skills organized by their types
 */
export const getSkillsByType = (): SkillsByType => {
  const skills = skillsJson.skills || [];
  const skillsByType: SkillsByType = {};

  // Iterate through each skill and group by type
  skills.forEach((skill: Skill) => {
    // initialise the array if the category not exists yet
    if (!skillsByType[skill.type]) {
      skillsByType[skill.type] = [];
    }
    // add skill to its type array
    skillsByType[skill.type].push(skill);
  });

  return skillsByType;
};

/**
 * Gets skills to be displayed
 * @returns An array of skills that are marked to be shown
 */
export const getSkills = (): Skill[] => {
  const skills: Skill[] = skillsJson.skills || [];
  return skills.filter((skill) => skill.show);
};

/**
 * Gets the display color for a specific skill category
 * @param category - The skill category name (e.g., "languages", "frameworks")
 * @returns The hex color code associated with the category, or a default blue if not found
 */
export const getCategoryColor = (category: string): string => {
  return SKILL_COLORS[category as keyof typeof SKILL_COLORS] || "#112C7B";
};

export const getSkillColor = (name: string): string => {
  const skills: Skill[] = skillsJson.skills || [];
  const skill = skills.find(
    (s) => s.name.toLowerCase() === name.toLowerCase(),
  );
  return skill ? getCategoryColor(skill.type) : getCategoryColor("");
};
