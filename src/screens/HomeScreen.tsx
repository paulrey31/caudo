// LIBRAIRIE
import { TouchableOpacity, StyleSheet, Text, View } from 'react-native';

// COMPONENTS
import Tag from '../components/Tag';
import Timer from '../components/Timer';
import Puzzle from '../components/puzzle/Puzzle';
import { columns } from '../components/puzzle/puzzle.contant';
import useSolutionsStore from '../store/SolutionsStore';
import { createSolutionObject } from '../components/puzzle/puzzle.function';

export default function HomeScreen() {
	// Récupérer la liste des solutions et les actions du store
	const setSolution = useSolutionsStore((state) => state.setSolution);
	return (
		<View style={styles.container}>
			{/* STATUS + TIMER */}
			<View style={styles.header}>
				<Tag
					label='Success'
					color='green'
				/>
				<Timer time='0.80s' />
			</View>
			{/* PUZZLE */}
			<View style={styles.body}>
				<Puzzle columns={columns} />
			</View>
			{/* BOUTON */}
			<View style={styles.footer}>
				<TouchableOpacity
					style={styles.button}
					onPress={() => setSolution(createSolutionObject())}>
					<Text style={styles.txtButton}>Générer</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 20,
		gap: 20,
	},
	header: {
		width: '100%',

		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'flex-start',
	},
	body: {
		flex: 1,
		width: '100%',

		alignItems: 'center',
		justifyContent: 'center',
	},
	footer: {
		height: 60,
		width: '100%',
		alignItems: 'center',
		justifyContent: 'center',
	},
	button: {
		height: '100%',
		width: '100%',
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#1E1E1E',
		borderRadius: 5,
	},
	txtButton: {
		fontSize: 20,
		fontWeight: 700,
		color: '#ffffff',
	},
});
