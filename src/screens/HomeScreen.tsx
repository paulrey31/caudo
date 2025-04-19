// LIBRAIRIE
import { Pressable, StyleSheet, Text, View } from 'react-native';

// COMPONENTS
import Tag from '../components/Tag';
import Timer from '../components/Timer';
import Puzzle from '../components/puzzle/Puzzle';
import { columns } from '../components/puzzle/puzzle.contant';

export default function HomeScreen() {
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
				<Pressable
					style={styles.button}
					onPress={() => console.log('heeh')}>
					<Text style={styles.txtButton}>Générer</Text>
				</Pressable>
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
