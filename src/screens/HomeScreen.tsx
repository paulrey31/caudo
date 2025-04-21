// LIBRAIRIE
import { TouchableOpacity, StyleSheet, Text, View } from 'react-native';

// COMPONENTS
import useHomeManager from '../hooks/useHomeManager';
import Timer from '../components/Timer';

export default function HomeScreen() {
	// HOOKS
	const { timer, onCreateAllSolutions } = useHomeManager();

	// render
	return (
		<View style={styles.container}>
			<Timer time={'' + timer} />
			{/* BOUTON */}
			<View style={styles.footer}>
				<TouchableOpacity
					style={styles.button}
					onPress={() => onCreateAllSolutions()}>
					<Text style={styles.txtButton}>Générer toutes les solutions</Text>
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
	buttonSave: {
		width: 100,
		height: 36,

		backgroundColor: '#E16A54',
		borderRadius: 5,

		alignItems: 'center',
		justifyContent: 'center',
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
