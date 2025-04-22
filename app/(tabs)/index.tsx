// library
import { StyleSheet, Text, View } from 'react-native';
import * as Haptics from 'expo-haptics';
import * as SplashScreen from 'expo-splash-screen';

// hooks
import useHomeManager from '@/src/hooks/useHomeManager';

// components
import Timer from '@/src/components/Timer';
import Button from '@/src/components/Button';
import SplashScreens from '@/src/components/SplashScreens';
// splash screen
SplashScreen.preventAutoHideAsync();

export default function Home() {
	// HOOKS
	const { timer, isLoading, isReady, onCreateSolutions, setLoadingMap } =
		useHomeManager();

	if (!isReady) {
		return <SplashScreens />;
	}
	// render
	return (
		<View style={styles.container}>
			{/* DESCRIPTION */}
			<View style={styles.header}>
				<Text style={styles.textMainDescription}>
					Bienvenue sur l'application
				</Text>
				<Text style={styles.textMainDescription}>Câu đố!</Text>
				<Text style={styles.textDescription}>
					Cette application vous permet de générer, visusaliser et de mettre à
					jour vos solutions pour ce jeux basé sur un casse-tête vietnamien.
				</Text>
			</View>
			<View style={styles.body}>
				{/* TIMER */}
				<Text style={styles.textMainDescription}>
					Temps pour générer les solutions
				</Text>
				<Timer time={'' + timer} />

				{/* BOUTONS GENERATE ALL SOLUTIONS */}
				<Button
					label='Générer toutes les solutions'
					color='#1E1E1E'
					height={60}
					width='100%'
					disabled={isLoading.all || isLoading.random}
					isLoading={isLoading.all}
					onPress={async () => {
						setLoadingMap((prev) => ({ ...prev, all: true }));
						await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
						onCreateSolutions('all');
					}}
				/>

				{/* BOUTONS GENERATE ONE SOLUTION */}
				<Button
					label='Générer une solutions'
					color='#1E1E1E'
					height={60}
					width='100%'
					disabled={isLoading.all || isLoading.random}
					isLoading={isLoading.random}
					onPress={async () => {
						setLoadingMap((prev) => ({ ...prev, random: true }));
						await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
						onCreateSolutions('random');
					}}
				/>
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
});
