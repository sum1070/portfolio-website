import skillsJson from "@/data/data.json";

export interface Skill {
  name: string;
  type: string;
  icon: string;
}

export interface SkillsByType {
  [key: string]: Skill[];
}

export const SKILL_COLORS = {
  languages: "#112C7B",
  frameworks: "#0F3677",
  backend: "#0E4072",
  tools: "#0c4a6e",
};

export const getSkillsByType = (): SkillsByType => {
  const skills = skillsJson.skills || [];
  const skillsByType: SkillsByType = {};

  skills.forEach((skill: Skill) => {
    if (!skillsByType[skill.type]) {
      skillsByType[skill.type] = [];
    }
    skillsByType[skill.type].push(skill);
  });

  return skillsByType;
};

export const getCategoryColor = (category: string): string => {
  return SKILL_COLORS[category as keyof typeof SKILL_COLORS] || "#112C7B";
};
