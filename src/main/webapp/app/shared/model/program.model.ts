import { Moment } from 'moment';
import { IBlocks } from 'app/shared/model/blocks.model';
import { ProgramType } from 'app/shared/model/enumerations/program-type.model';

export interface IProgram {
  id?: number;
  programType?: ProgramType;
  startDate?: Moment;
  isActive?: boolean;
  blocks?: IBlocks;
}

export const defaultValue: Readonly<IProgram> = {
  isActive: false
};
