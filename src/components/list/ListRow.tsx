import { StyleSheet, Text, View } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Tag from '../Tag';
import { ListRowType } from '@/src/types/list.type';

export default function ListRow({ item }: ListRowType) {
	// GET DATA NEEDED
	const { solution, status } = item;

	// RETURN
	return (
		<View style={styles.container}>
			{/* SOLUTION */}
			{solution.map((item, index) => {
				return (
					<View
						key={index}
						style={styles.solution}>
						<Text style={styles.text}>{item}</Text>
					</View>
				);
			})}
			{/* TAG */}
			<Tag
				label={status}
				color={status === 'success' ? 'green' : 'red'}
				size='small'
			/>
			{/* ICON */}
			<MaterialIcons
				name='keyboard-arrow-right'
				size={24}
				color='#ffffff'
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		height: 80,
		width: '98%',

		backgroundColor: '#1E1E1E',

		padding: 8,
		marginVertical: 4,

		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',

		borderRadius: 5,
	},
	solution: {
		height: 20,
		width: 20,

		alignItems: 'center',
		justifyContent: 'center',

		backgroundColor: '#FFFFFF',

		borderRadius: 5,
		marginRight: 4,
	},
	text: {
		fontSize: 16,
		fontWeight: 700,
		// color: '#ffffff',
	},
});
