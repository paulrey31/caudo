import { StyleSheet, Text, View } from 'react-native';

type PuzzleCellType = {
	cell: string;
};

export default function PuzzleCell({ cell }: PuzzleCellType) {
	const isEmptyCell = cell === 'empty_cell';
	return (
		<View style={{ ...styles.container, borderWidth: isEmptyCell ? 0 : 1 }}>
			<Text style={styles.text}>{isEmptyCell ? '' : cell}</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		width: 50,
		height: 50,

		borderWidth: 2,
		borderColor: 'black',
		// borderRadius: 5,

		alignItems: 'center',
		justifyContent: 'center',
	},
	text: {
		fontSize: 20,
		fontWeight: 700,
	},
});
