// LIBRAIRIE
import {
	TouchableOpacity,
	StyleSheet,
	Text,
	View,
	ActivityIndicator,
} from 'react-native';
import * as Haptics from 'expo-haptics';

// COMPONENTS
import useHomeManager from '../hooks/useHomeManager';
import Timer from '../components/Timer';

export default function HomeScreen() {
	// HOOKS
	const { timer, isLoading, onCreateSolutions } = useHomeManager();

	// render
	return (
		<View style={styles.container}>
			{/* DESCRIPTION */}
			<View style={styles.header}>
				<Text style={styles.textMainDescription}>
					Bienvenue sur l'application Câu đố!
				</Text>
				<Text style={styles.textDescription}>
					Cette application vous permet de générer, visusaliser et de mettre à
					jour vos solutions pour ce jeux basé sur un casse-tête vietnamien.
				</Text>
			</View>
			<View style={styles.body}>
				{/* TIMER */}
				<Text style={styles.textMainDescription}>
					Temps de génération des solutions
				</Text>
				<Timer time={'' + timer} />

				{/* BOUTONS */}
				{[
					{ label: 'Générer toutes les solutions', type: 'all' },
					{ label: 'Générer les solutions valide', type: 'all-valid' },
					{ label: 'Générer les solutions invalide', type: 'all-invalid' },
					{ label: 'Générer une solutions', type: 'random' },
				].map((btn, index) => (
					<TouchableOpacity
						key={index}
						style={styles.button}
						onPress={() => {
							Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
							onCreateSolutions(btn.type);
						}}
						disabled={isLoading['all']}>
						<View style={styles.row}>
							<Text style={styles.txtButton}>{btn.label}</Text>
							{isLoading[btn.type] && (
								<View style={styles.loaderWrapper}>
									<ActivityIndicator
										size='small'
										color='#fff'
									/>
								</View>
							)}
						</View>
					</TouchableOpacity>
				))}
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 20,
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'space-between',
		alignItems: 'flex-start',
		gap: 20,
	},
	header: {
		width: '100%',
		gap: 12,
		alignItems: 'center',
		justifyContent: 'center',
	},
	textMainDescription: {
		fontSize: 22,
		fontWeight: 700,
	},
	textDescription: {
		fontSize: 20,
		fontWeight: 500,
	},
	body: {
		flex: 1,
		width: '100%',

		alignItems: 'center',
		justifyContent: 'center',
		gap: 20,
	},
	button: {
		height: 60,
		width: '100%',
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#1E1E1E',
		borderRadius: 5,
	},
	row: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		gap: 10,
	},
	loaderWrapper: {
		marginLeft: 8,
	},
	txtButton: {
		fontSize: 20,
		fontWeight: 700,
		color: '#ffffff',
	},
});
