// Import skills data from the central data.json file
import skillsJson from "@/data/data.json";

// e.g. { name: "JavaScript", type: "languages", icon: "javascript" }
export interface Skill {
  name: string;
  type: string;
  icon: string;
}

// object to hold skills grouped by category
export interface SkillsByType {
  [key: string]: Skill[];
}

export const SKILL_COLORS = {
  languages: "#112C7B",
  frameworks: "#0F3677",
  backend: "#0E4072",
  tools: "#0c4a6e",
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
 * Gets the display color for a specific skill category
 * @param category - The skill category name (e.g., "languages", "frameworks")
 * @returns The hex color code associated with the category, or a default blue if not found
 */
export const getCategoryColor = (category: string): string => {
  return SKILL_COLORS[category as keyof typeof SKILL_COLORS] || "#112C7B";
};
