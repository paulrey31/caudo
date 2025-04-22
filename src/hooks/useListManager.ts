import { useState, useMemo } from 'react';

// types
import { SolutionType } from '@/src/types/solution.type';
import { ListFilterType } from '@/src/types/list.type';

export default function useListManager(solutions: SolutionType[]) {
	// state
	const [scrollEnabled, setScrollEnabled] = useState<boolean>(true);
	const [filter, setFilter] = useState<ListFilterType>('all');

	// Liste filtrée selon le filtre actif
	const filteredSolutions = useMemo(() => {
		if (filter === 'all') return solutions;
		return solutions.filter((item) => item.status === filter);
	}, [filter, solutions]);

	// Compte les solution réussi et loupé
	const counts = useMemo(() => {
		// init
		let success = 0;
		let fail = 0;

		// loop sur les solutions
		for (const item of solutions) {
			if (item.status === 'success') success++;
			else if (item.status === 'fail') fail++;
		}

		// return
		return {
			all: solutions.length,
			success,
			fail,
		};
	}, [solutions]);

	// return
	return {
		// state
		scrollEnabled,
		filter,

		// set
		setFilter,
		setScrollEnabled,

		// memo
		filteredSolutions,
		counts,
	};
}
