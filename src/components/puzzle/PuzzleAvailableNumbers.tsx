import { StyleSheet, Text, View } from 'react-native';
import { PuzzleAvailableNumbersType } from './puzzle.type';

export default function PuzzleAvailableNumbers({
	availableNumbers,
}: PuzzleAvailableNumbersType) {
	return (
		<View style={styles.container}>
			{availableNumbers.map((number, index) => {
				return (
					<View
						key={index}
						style={styles.containerCell}>
						<Text style={styles.text}>{number}</Text>
					</View>
				);
			})}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		width: '100%',

		display: 'flex',
		flexDirection: 'row',
		flexWrap: 'wrap',
		alignItems: 'center',
		justifyContent: 'center',
	},
	containerCell: {
		width: 50,
		height: 50,

		borderWidth: 2,
		borderColor: 'black',
		borderRadius: 5,

		alignItems: 'center',
		justifyContent: 'center',

		margin: 5,
	},
	text: {
		fontSize: 20,
		fontWeight: 700,
	},
});
