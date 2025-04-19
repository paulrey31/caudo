// LIBRAIRIE
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// COMPONENTS
import Tag from '../components/Tag';
import Timer from '../components/Timer';
import Puzzle from '../components/puzzle/Puzzle';
import { columns } from '../components/puzzle/puzzle.contant';

export default function HomeScreen() {
	return (
		<SafeAreaView style={styles.container}>
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
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
	header: {
		height: 56,
		width: '100%',

		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'flex-start',

		paddingTop: 20,
		paddingLeft: 20,
		paddingRight: 20,
	},
	body: {
		flex: 1,
		width: '100%',

		alignItems: 'center',
		justifyContent: 'center',

		padding: 20,
	},
	footer: {
		height: 60,
		width: '100%',
		alignItems: 'center',
		justifyContent: 'center',
		paddingBottom: 20,
		paddingLeft: 20,
		paddingRight: 20,
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
