import { useCallback, useState } from 'react';
import useSolutionsStore from '../store/SolutionsStore';
import {
	generateSolutionsSmart,
	SolutionVariant,
} from '../functions/solution.function';
import { useRouter } from 'expo-router';

export default function useHomeManager() {
	// zustang
	const addAllSolutions = useSolutionsStore((state) => state.addAllSolutions);
	const addSolution = useSolutionsStore((state) => state.addSolution);

	// navigation
	const router = useRouter();

	// state
	const [timer, setTimer] = useState<string>('00m00.00s');
	const [loadingMap, setLoadingMap] = useState<
		Record<SolutionVariant, boolean>
	>({
		all: false,
		'all-valid': false,
		'all-invalid': false,
		random: false,
	});

	// function to create solutions
	const onCreateSolutions = useCallback((variant: SolutionVariant) => {
		setLoadingMap((prev) => ({ ...prev, [variant]: true }));

		const { solutions, duration } = generateSolutionsSmart(variant);
		switch (variant) {
			case 'random':
				addSolution(solutions[0]);
				break;
			default:
				addAllSolutions(solutions);
				break;
		}

		setTimeout(() => {
			setTimer(duration);
		}, 1500);
		setTimeout(() => {
			setLoadingMap((prev) => ({ ...prev, [variant]: false }));
			router.push('/(tabs)/list');
		}, 3000);
	}, []);

	// return
	return {
		timer,
		isLoading: loadingMap,
		onCreateSolutions,
	};
}
