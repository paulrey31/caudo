import { useCallback, useState } from 'react';
import { findAllValidSolutions } from '../components/puzzle/puzzle.function';
import useSolutionsStore from '../store/SolutionsStore';

export default function useHomeManager() {
	// store zustang
	const addAllSolutions = useSolutionsStore((state) => state.addAllSolutions);

	// state
	const [timer, setTimer] = useState<string>('00m00s');

	const onCreateAllSolutions = useCallback(() => {
		const { solutions, duration } = findAllValidSolutions();

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
