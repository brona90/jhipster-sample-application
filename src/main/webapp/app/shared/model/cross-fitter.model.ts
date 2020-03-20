import { IProgram } from 'app/shared/model/program.model';
import { ICoreSkills } from 'app/shared/model/core-skills.model';
import { GeneticSex } from 'app/shared/model/enumerations/genetic-sex.model';

export interface ICrossFitter {
  id?: number;
  geneticSex?: GeneticSex;
  genderID?: string;
  photoContentType?: string;
  photo?: any;
  program?: IProgram;
  coreSkills?: ICoreSkills;
}

export const defaultValue: Readonly<ICrossFitter> = {};
