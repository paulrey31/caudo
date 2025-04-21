import { useState } from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';

type PuzzleCellType = {
	cell: string;
};

export default function PuzzleCell({
	state,
	index,
	cell,
	updateSolutionAtIndex,
}: PuzzleCellType) {
	const isEmptyCell = cell === 'empty_cell';
	const isUserInput = state.solution.includes(cell); // ou autre logique pour déterminer si c’est un champ modifiable

	if (isEmptyCell) {
		return <View style={{ ...styles.container, borderWidth: 0 }} />;
	}

	if (isUserInput) {
		const [value, setValue] = useState(cell ? String(cell) : '');

		return (
			<View style={styles.container}>
				<TextInput
					style={styles.input}
					value={value}
					keyboardType='number-pad'
					onChangeText={(text) => updateSolutionAtIndex(index, +text)}
					maxLength={2}
				/>
			</View>
		);
	}

	// Cas normal : cellule non modifiable
	return (
		<View style={styles.container}>
			<Text style={styles.text}>{cell}</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,

		borderWidth: 2,
		borderColor: 'black',
		borderRadius: 5,

		alignItems: 'center',
		justifyContent: 'center',
	},
	text: {
		fontSize: 20,
		fontWeight: 700,
	},
	input: {
		fontSize: 20,
		fontWeight: 'bold',
		textAlign: 'center',
		color: '#000',
		padding: 0,
		margin: 0,
	},
});
