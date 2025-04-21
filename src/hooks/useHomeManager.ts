import { useCallback, useState } from 'react';
import useSolutionsStore from '../store/SolutionsStore';
import { generateSolutionsSmart } from '../functions/solution.function';

export default function useHomeManager() {
	// store zustang
	const addAllSolutions = useSolutionsStore((state) => state.addAllSolutions);

	// state
	const [timer, setTimer] = useState<string>('00m00s');

	const onCreateAllSolutions = useCallback(() => {
		const { solutions, duration } = generateSolutionsSmart('all');

		setTimer(duration);

		addAllSolutions(solutions);
	}, []);

	return {
		// state
		timer,
		// function
		onCreateAllSolutions,
	};
}
