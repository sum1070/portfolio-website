import skillsJson from "@/data/data.json";

export interface Skill {
  name: string;
  type: string;
  icon: string;
}

export const getSkillsByType = () => {
  const skills = skillsJson.skills || [];
  const skillsByType: Record<string, Skill[]> = {};

  skills.forEach((skill: Skill) => {
    if (!skillsByType[skill.type]) {
      skillsByType[skill.type] = [];
    }
    skillsByType[skill.type].push(skill);
  });

  return skillsByType;
};
