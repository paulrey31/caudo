import { useEffect, useState } from 'react';

// types
import { SolutionType, Solution } from '../types/solution.type';

// store
import useSolutionsStore from '../store/SolutionsStore';
import {
	calculateSolutionStatus,
	hasSolutionChanged,
} from '../functions/solution.function';

export default function useSolutionDetailsManager({ id = '' }) {
	// store zustang
	const getSolutionById = useSolutionsStore((state) => state.getSolutionById);

	// state
	const [state, setState] = useState<SolutionType>({
		id: '',
		solution: [0, 0, 0, 0, 0, 0, 0, 0, 0] as Solution,
		status: 'fail',
	});
	const [isUpdated, setIsUpdated] = useState(false);

	const handleUpdateSolution = (solution: Solution) => {
		// calculate the new status
		const newStatus = calculateSolutionStatus(solution);
		// check if the solution has changed
		const hasChanged = hasSolutionChanged(solution, state.solution);

		// update the solution
		setState((prev) => ({ ...prev, solution, status: newStatus }));
		// update the isUpdated state
		setIsUpdated(hasChanged);
	};

	// useEffect to get the solution and apply it to the columns
	useEffect(() => {
		const solution = getSolutionById(id);
		if (solution) setState(solution);
	}, [id]);

	// return
	return {
		state,
		isUpdated,
		handleUpdateSolution,
	};
}
