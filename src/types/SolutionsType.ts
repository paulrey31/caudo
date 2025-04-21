// Solution type
export type SolutionType = {
	id: string;
	solution: number[];
	status: string;
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
};
