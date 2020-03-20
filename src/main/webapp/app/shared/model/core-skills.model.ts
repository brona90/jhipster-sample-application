import { ICoreSkill } from 'app/shared/model/core-skill.model';

export interface ICoreSkills {
  id?: number;
  coreSkills?: ICoreSkill[];
}

export const defaultValue: Readonly<ICoreSkills> = {};
