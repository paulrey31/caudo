import { useEffect, useState } from 'react';
import { SolutionType } from '../types/SolutionsType';
import useSolutionsStore from '../store/SolutionsStore';

export default function useSolutionDetailsManager({ id = '' }) {
	// store zustang
	const getSolutionById = useSolutionsStore((state) => state.getSolutionById);

	// state
	const [state, setState] = useState<SolutionType>({
		id: '',
		solution: [],
		status: '',
	});

	useEffect(() => {
		const solution = getSolutionById(id);
		setState(solution);
	}, [id]);

	return {
		state,
	};
}
