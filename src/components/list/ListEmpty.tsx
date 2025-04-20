import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function ListEmpty() {
	const router = useRouter();
	return (
		<View style={styles.container}>
			<View style={styles.containerEmptyData}>
				<MaterialIcons
					name='info'
					size={32}
					color='#E16A54'
				/>
				<Text style={styles.text}>Aucune solution enregistrée.</Text>
			</View>
			<TouchableOpacity
				style={styles.button}
				onPress={() => router.push('/')}>
				<Text style={styles.buttonText}>Revenir à l'acceuil</Text>
			</TouchableOpacity>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,

		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',

		gap: 40,
	},
	containerEmptyData: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',

		gap: 12,
	},
	text: {
		fontSize: 22,
		fontWeight: 700,
	},
	button: {
		height: 42,
		width: 140,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#1E1E1E',
		borderRadius: 5,
	},
	buttonText: {
		fontSize: 14,
		fontWeight: 700,
		color: '#ffffff',
	},
});
