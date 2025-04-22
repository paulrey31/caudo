type ReplaceElementAtIndexProps = {
	array: (number | null)[];
	reverse: boolean;
};

type RelationIndexType = {
	[key: number]: number;
};

export const relationIndex: RelationIndexType = {
	0: 0,
	1: 4,
	2: 5,
	3: 1,
	4: 3,
	5: 6,
	6: 8,
	7: 2,
	8: 7,
};

export const relationIndexReverse: RelationIndexType = {
	0: 0,
	1: 3,
	2: 7,
	3: 4,
	4: 1,
	5: 2,
	6: 5,
	7: 8,
	8: 6,
};

export function replaceElementAtIndex({
	array,
	reverse,
}: ReplaceElementAtIndexProps) {
	const newArray = [...array];
	const newIndexObj = reverse ? relationIndexReverse : relationIndex;

	for (let i = 0; i < array.length; i++) {
		const index = newIndexObj[i];
		newArray[i] = array[index];
	}
	return newArray;
}
