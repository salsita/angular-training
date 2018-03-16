export interface Skill {
  id: string;
  skill: string;
}

export interface UserSkill {
  skill: Skill;
}

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  skills: UserSkill[];
}
