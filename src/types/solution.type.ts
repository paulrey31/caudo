// solution variant
export type SolutionVariant = 'random' | 'all-valid' | 'all-invalid' | 'all';

// solution
export type Solution = (number | null)[];

export type SolutionStatus = 'success' | 'fail' | 'error';

export const SolutionStatusColor = {
	success: 'green',
	fail: 'orange',
	error: 'red',
};

// Solution type
export type SolutionType = {
	id: string;
	solution: Solution;
	status: SolutionStatus;
};

// State Solutions
export type SolutionsStateType = {
	solutions: SolutionType[];
};

// Actions solutions
export type SolutionsActionsType = {
	addSolution: (newSolution: SolutionType) => void;
	addAllSolutions: (newSolutions: SolutionType[]) => void;
	clearSolutions: () => void;
	removeSolution: (id: string) => void;
	getSolutionById: (id: string) => SolutionType;
	updateSolutionById: (
		id: string,
		newSolution: number[],
		newStatus: string,
	) => void;
};
