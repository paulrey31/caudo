import { SolutionType } from '@/src/types/SolutionsType';

export type PuzzleCellType = {
	cell: string;
};

export type PuzzleColumnType = {
	column: PuzzleCellType;
};

export type PuzzleType = {
	state: SolutionType;
	columns: PuzzleColumnType[];
};

export type PuzzleAvailableNumbersType = {
	availableNumbers: number[];
};
