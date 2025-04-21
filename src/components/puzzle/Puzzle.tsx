import { Animated, StyleSheet, View } from 'react-native';
import PuzzleColumn from './PuzzleColumn';
import { PuzzleType } from './puzzle.type';

export default function Puzzle({
	state,
	columns,
	updateSolutionAtIndex,
}: PuzzleType) {
	return (
		<Animated.View style={styles.container}>
			{/* GRID */}
			<View style={styles.gridContainer}>
				{columns.map((column, index) => {
					return (
						<PuzzleColumn
							key={'column_' + index}
							column={column}
							state={state}
							updateSolutionAtIndex={updateSolutionAtIndex}
						/>
					);
				})}
			</View>
		</Animated.View>
	);
}

const styles = StyleSheet.create({
	container: {
		width: '100%',
		height: '100%',
		padding: 20,

		borderWidth: 2,
		borderColor: 'black',
		borderRadius: 5,

		alignItems: 'center',
		justifyContent: 'center',

		gap: 20,
	},
	gridContainer: {
		flex: 1,
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
	},
	text: {
		fontSize: 18,
		fontWeight: 700,
	},
});
