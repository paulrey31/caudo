import { Animated, StyleSheet, View } from 'react-native';
import PuzzleColumn from './PuzzleColumn';
import { PuzzleType } from './puzzle.type';
import PuzzleAvailableNumbers from './PuzzleAvailableNumbers';
import { availableNumbers } from './puzzle.contant';

export default function Puzzle({ columns }: PuzzleType) {
	return (
		<Animated.View style={styles.container}>
			{/* GRID */}
			<View style={styles.gridContainer}>
				{columns.map((column, index) => {
					return (
						<PuzzleColumn
							key={'column_' + index}
							column={column}
						/>
					);
				})}
			</View>
			{/* AVAILABLE NUMBERS */}
			<PuzzleAvailableNumbers availableNumbers={availableNumbers} />
		</Animated.View>
	);
}

const styles = StyleSheet.create({
	container: {
		width: '100%',
		height: '100%',

		borderWidth: 2,
		borderColor: 'black',
		borderRadius: 5,

		alignItems: 'center',
		justifyContent: 'center',

		gap: '20px',
	},
	gridContainer: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',

		marginBottom: 20,
	},
	text: {
		fontSize: 18,
		fontWeight: 700,
	},
});
