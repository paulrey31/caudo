// library
import { useCallback, useState } from 'react';
import { useRouter } from 'expo-router';

// store
import useSolutionsStore from '../store/SolutionsStore';

// functions
import { generateSolutionsSmart } from '../functions/solution.function';

// types
import { SolutionVariant } from '../types/solution.type';

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
	const onCreateSolutions = useCallback(
		async (variant: SolutionVariant) => {
			// generate solutions
			const { solutions, duration } = await generateSolutionsSmart(variant);

			// add solutions to store
			switch (variant) {
				case 'random':
					addSolution(solutions[0]);
					break;
				default:
					addAllSolutions(solutions);
					break;
			}

			// set timer
			setTimer(duration);

			// naviguer vers la liste après un court délai
			setTimeout(() => {
				setLoadingMap((prev) => ({ ...prev, [variant]: false }));

				switch (variant) {
					case 'random':
						router.push({
							pathname: '/solutionDetails',
							params: { id: solutions[0].id },
						});
						break;
					default:
						router.push('/(tabs)/list');
						break;
				}
			}, 1500);
		},
		[addSolution, addAllSolutions, router],
	);

	// return
	return {
		timer,
		isLoading: loadingMap,
		onCreateSolutions,
		setLoadingMap,
	};
}
