export type CellType = 'fixed' | 'input';

export type CellSpec = {
	type: CellType;
	value?: string;
	visible?: boolean;
};
