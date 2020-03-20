import { IBlocks } from 'app/shared/model/blocks.model';

export interface IBlock {
  id?: number;
  isInProgram?: boolean;
  name?: string;
  blocks?: IBlocks;
}

export const defaultValue: Readonly<IBlock> = {
  isInProgram: false
};
