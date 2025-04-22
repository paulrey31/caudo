import { View, StyleSheet } from 'react-native';
import PuzzleCell from './PuzzleCell';
import { usePuzzleManager } from '@/src/hooks/usePuzzleManager';
import { replaceElementAtIndex } from '@/src/functions/puzzle.function';
import { rawGrid } from '@/src/constant/puzzle.contant';

type Props = {
	solution: (number | null)[];
	handleUpdateSolution: (solution: (number | null)[]) => void;
};

export default function PuzzleGrid({ solution, handleUpdateSolution }: Props) {
	const { values, updateValue } = usePuzzleManager({ solution });
	let inputIndex = 0;

	// render
	return (
		<View style={styles.grid}>
			{rawGrid.map((row, rowIndex) => (
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
}

const styles = StyleSheet.create({
	grid: {
		backgroundColor: '#f4f4f4',
		alignSelf: 'center',
	},
	row: {
		flexDirection: 'row',
	},
});
