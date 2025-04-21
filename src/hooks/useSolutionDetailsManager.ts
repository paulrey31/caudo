import { useEffect, useState } from 'react';
import { SolutionType } from '../types/SolutionsType';
import useSolutionsStore from '../store/SolutionsStore';
import { defaultColumns } from '../components/puzzle/puzzle.contant';
import {
	applySolutionToColumns,
	isValidSolution,
} from '../functions/solution.function';

export default function useSolutionDetailsManager({ id = '' }) {
	// store zustang
	const getSolutionById = useSolutionsStore((state) => state.getSolutionById);

	// state
	const [state, setState] = useState<SolutionType>({
		id: '',
		solution: [],
		status: '',
	});
	const [isUpdated, setIsUpdated] = useState<boolean>(false);
	const [columns, setColumns] = useState(defaultColumns);

	function updateSolutionAtIndex(index: number, newValue: number) {
		setState((prev) => {
			const updatedSolution = [...prev.solution];
			updatedSolution[index] = newValue;

			return {
				...prev,
				solution: updatedSolution,
			};
		});
	}

	useEffect(() => {
		const solution = getSolutionById(id);
		const columnsUpdated = applySolutionToColumns(columns, solution.solution);
		setState(solution);
		setColumns(columnsUpdated);
	}, [id]);

	useEffect(() => {
		const hasEmpty = state.solution.some(
			(n) => n === undefined || n === null || isNaN(n),
		);
		const hasDuplicates =
			new Set(state.solution).size !== state.solution.length;

		let status: SolutionType['status'] = '';

		if (hasEmpty || hasDuplicates) {
			status = 'error';
		} else if (isValidSolution(state.solution)) {
			status = 'success';
		} else {
			status = 'fail';
		}

		setState((prev) => ({
			...prev,
			status,
		}));
		setIsUpdated(true);
	}, [state.solution]);

	return {
		state,
		isUpdated,
		columns,
		updateSolutionAtIndex,
	};
}
