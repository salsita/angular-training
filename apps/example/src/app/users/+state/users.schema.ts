import { schema } from 'normalizr';
import { skillsEntity, usersEntity, usersSkillsEntity } from './users.entities';

export const skillSchema = new schema.Entity(skillsEntity);

export const userSkillSchema = new schema.Entity(
  usersSkillsEntity,
  {
    skill: skillSchema
  },
  {
    idAttribute: (value, parent) => `${value.skill.id}-${parent.id}`
  }
);

export const userSchema = new schema.Entity(usersEntity, {
  skills: [userSkillSchema]
});

export const usersSchema = [userSchema];
