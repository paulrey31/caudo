import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Text } from 'react-native';
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function Layout() {
	return (
		<GestureHandlerRootView style={{ flex: 1 }}>
			<SafeAreaProvider
				style={{
					flex: 1,
					backgroundColor: '#1E1E1E',
				}}>
				<StatusBar
					style='light'
					backgroundColor='#1E1E1E'
				/>
				<Tabs
					screenOptions={{
						headerStyle: { backgroundColor: '#1E1E1E' },
						headerTintColor: '#fff',
						headerTitleAlign: 'center',
						tabBarStyle: {
							backgroundColor: '#1E1E1E',
							borderTopWidth: 0,
						},
						tabBarActiveTintColor: '#fff',
						tabBarInactiveTintColor: 'rgba(255,255,255,0.6)',
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
					<Tabs.Screen
						name='index'
						options={{
							title: 'Accueil',
							tabBarIcon: ({ color, size, focused }) => (
								<Ionicons
									name={focused ? 'home' : 'home-outline'}
									size={size}
									color={color}
								/>
							),
						}}
					/>
					<Tabs.Screen
						name='list'
						options={{
							title: 'Liste',
							tabBarIcon: ({ color, size, focused }) => (
								<Ionicons
									name={focused ? 'list' : 'list-outline'}
									size={size}
									color={color}
								/>
							),
						}}
					/>
				</Tabs>
			</SafeAreaProvider>
		</GestureHandlerRootView>
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
