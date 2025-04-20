export type PuzzleCellType = {
	cell: string;
};

export type PuzzleColumnType = {
	column: PuzzleCellType;
};

export type PuzzleType = {
	columns: PuzzleColumnType[];
};

export type PuzzleAvailableNumbersType = {
	availableNumbers: number[];
};
