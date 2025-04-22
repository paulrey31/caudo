// library
import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';

// store
import useSolutionsStore from '../store/SolutionsStore';

// functions
import { generateSolutionsSmart } from '../functions/solution.function';

// types
import { SolutionVariant } from '../types/solution.type';
import { getSolutions, postSolution } from '../services/api';
import { uploadSolutionsInBatches } from '../functions/api.function';

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
	const [isReady, setIsReady] = useState<boolean>(false);

	// function to create solutions
	const onCreateSolutions = useCallback(
		async (variant: SolutionVariant) => {
			// generate solutions
			const { solutions, duration } = await generateSolutionsSmart(variant);

			// set timer
			setTimer(duration);

			// add solutions to store
			switch (variant) {
				case 'random':
					addSolution(solutions[0]);
					try {
						await postSolution(solutions[0]);
					} catch (e) {
						console.error('Erreur générale :', e);
					}
					router.push({
						pathname: '/solutionDetails',
						params: { id: solutions[0].id },
					});
					break;
				default:
					addAllSolutions(solutions);
					try {
						await uploadSolutionsInBatches(solutions, 10000);
					} catch (e) {
						console.error('Erreur générale :', e);
					}
					router.push('/(tabs)/list');
					break;
			}
			setLoadingMap((prev) => ({ ...prev, [variant]: false }));
		},
		[addSolution, addAllSolutions, router],
	);

	useEffect(() => {
		const fetchSolutions = async () => {
			try {
				const solutions = await getSolutions();
				addAllSolutions(solutions);
			} catch (e) {
				console.error('Erreur générale :', e);
			} finally {
				setIsReady(true);
				SplashScreen.hideAsync();
			}
		};
		fetchSolutions();
	}, []);

	// return
	return {
		timer,
		isLoading: loadingMap,
		isReady,
		onCreateSolutions,
		setLoadingMap,
	};
}
