import { StyleSheet, ActivityIndicator, Image, Text, View } from 'react-native';
import logo from '@/assets/images/puzzleIcon.png';

export default function SplashScreens() {
	return (
		<View style={styles.splashContainer}>
			<Image
				source={logo}
				style={styles.logo}
			/>
			<Text style={styles.title}>My Cool App</Text>
			<ActivityIndicator
				size='large'
				color='#333'
				style={{ marginTop: 20 }}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	splashContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#fff', // ou couleur de ton splash
	},
	logo: {
		width: 100,
		height: 100,
		marginBottom: 20,
		resizeMode: 'contain',
	},
	title: {
		fontSize: 24,
		fontWeight: 'bold',
	},
});
