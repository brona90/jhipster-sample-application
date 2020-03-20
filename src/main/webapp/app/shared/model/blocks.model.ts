import { IBlock } from 'app/shared/model/block.model';

export interface IBlocks {
  id?: number;
  blocks?: IBlock[];
}

export const defaultValue: Readonly<IBlocks> = {};
