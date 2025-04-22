import { useEffect, useState } from 'react';
import { replaceElementAtIndex } from '../functions/puzzle.function';

export const usePuzzleManager = ({ solution }: { solution: number[] }) => {
	console.log('solution', solution);

	const [values, setValues] = useState<(number | null)[]>(
		replaceElementAtIndex({ array: solution, reverse: false }),
	);

	const updateValue = (index: number, value: number | null) => {
		setValues((prev) => {
			const updated = [...prev];
			updated[index] = value;
			return updated;
		});
	};

	useEffect(() => {
		setValues(replaceElementAtIndex({ array: solution, reverse: false }));
	}, [solution]);

	return { values, updateValue };
};
