import { Ionicons } from '@expo/vector-icons';
import { Stack } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

export default function RootLayout() {
	return (
		<Stack
			screenOptions={{
				headerStyle: { backgroundColor: '#1E1E1E' },
				headerTintColor: '#fff',
				headerTitleAlign: 'center',
				headerBackButtonDisplayMode: 'minimal',
				headerTitle: () => (
					<View style={styles.headerTitle}>
						<Ionicons
							name='extension-puzzle'
							size={24}
							color='white'
						/>
						<Text style={styles.titleText}>Câu đố</Text>
					</View>
				),
			}}>
			<Stack.Screen
				name='(tabs)'
				options={{ headerShown: false }}
			/>
			<Stack.Screen name='solutionDetails' />
		</Stack>
	);
}
const styles = StyleSheet.create({
	safeArea: {
		flex: 1,
		backgroundColor: '#1E1E1E',
	},
	headerTitle: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	titleText: {
		color: '#fff',
		fontSize: 18,
		fontWeight: '700',
		marginLeft: 4,
	},
});
