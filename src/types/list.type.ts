import { SolutionType } from './solution.type';

export type ListRowType = {
	item: SolutionType;
};

export type ListColumnType = {
	[key: string]: string;
};

export type ListFilterType = 'all' | 'success' | 'fail';
