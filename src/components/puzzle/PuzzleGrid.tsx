import { View, StyleSheet } from 'react-native';
import { PuzzleCell } from './PuzzleCell';
import { usePuzzleManager } from '@/src/hooks/usePuzzleManager';
import { CellSpec } from '@/src/types/puzzle.type';
import { replaceElementAtIndex } from '@/src/functions/puzzle.function';

export const PuzzleGrid = ({
	solution,
	handleUpdateSolution,
}: {
	solution: number[];
	handleUpdateSolution: (solution: number[]) => void;
}) => {
	const { values, updateValue } = usePuzzleManager({ solution });
	let inputIndex = 0;

	const rawGrid: (CellSpec | null)[][] = [
		[
			null,
			{ type: 'fixed', visible: false },
			null,
			{ type: 'fixed', value: '-', visible: true },
			null,
			{ type: 'fixed', visible: false },
			{ type: 'fixed', value: '66', visible: true },
		],
		[
			{ type: 'fixed', value: '+', visible: true },
			{ type: 'fixed', visible: false },
			{ type: 'fixed', value: 'x', visible: true },
			{ type: 'fixed', visible: false },
			{ type: 'fixed', value: '-', visible: true },
			{ type: 'fixed', visible: false },
			{ type: 'fixed', value: '=', visible: true },
		],
		[
			{ type: 'fixed', value: '13', visible: true },
			{ type: 'fixed', visible: false },
			{ type: 'fixed', value: '12', visible: true },
			{ type: 'fixed', visible: false },
			{ type: 'fixed', value: '11', visible: true },
			{ type: 'fixed', visible: false },
			{ type: 'fixed', value: '10', visible: true },
		],
		[
			{ type: 'fixed', value: 'x', visible: true },
			{ type: 'fixed', visible: false },
			{ type: 'fixed', value: '+', visible: true },
			{ type: 'fixed', visible: false },
			{ type: 'fixed', value: '+', visible: true },
			{ type: 'fixed', visible: false },
			{ type: 'fixed', value: '-', visible: true },
		],
		[
			null,
			{ type: 'fixed', visible: false },
			null,
			{ type: 'fixed', visible: false },
			null,
			{ type: 'fixed', visible: false },
			null,
		],
		[
			{ type: 'fixed', value: ':', visible: true },
			null,
			{ type: 'fixed', value: '+', visible: true },
			{ type: 'fixed', visible: false },
			{ type: 'fixed', value: 'x', visible: true },
			null,
			{ type: 'fixed', value: ':', visible: true },
		],
	];

	const grid: CellSpec[][] = rawGrid.map((row) =>
		row.map((cell) => cell ?? { type: 'input' }),
	);

	return (
		<View style={styles.grid}>
			{grid.map((row, rowIndex) => (
				<View
					key={rowIndex}
					style={styles.row}>
					{row.map((cell, colIndex) => {
						if (cell.type === 'fixed') {
							return (
								<PuzzleCell
									key={`${rowIndex}-${colIndex}`}
									type='fixed'
									value={cell.value}
									visible={cell.visible}
								/>
							);
						} else {
							const idx = inputIndex++;
							return (
								<PuzzleCell
									key={`${rowIndex}-${colIndex}`}
									type='input'
									inputValue={values[idx]}
									onChange={(val) => updateValue(idx, val)}
									onBlur={() =>
										handleUpdateSolution(
											replaceElementAtIndex({ array: values, reverse: true }),
										)
									}
								/>
							);
						}
					})}
				</View>
			))}
		</View>
	);
};

const styles = StyleSheet.create({
	grid: {
		backgroundColor: '#f4f4f4',
		alignSelf: 'center',
	},
	row: {
		flexDirection: 'row',
	},
});
