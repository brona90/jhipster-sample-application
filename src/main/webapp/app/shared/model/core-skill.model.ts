import { ICoreSkills } from 'app/shared/model/core-skills.model';
import { CoreSkillType } from 'app/shared/model/enumerations/core-skill-type.model';

export interface ICoreSkill {
  id?: number;
  coreSkillType?: CoreSkillType;
  ability?: number;
  perscription?: string;
  coreSkills?: ICoreSkills;
}

export const defaultValue: Readonly<ICoreSkill> = {};
