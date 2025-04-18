import { Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ListScreen() {
	return (
		<SafeAreaView
			style={{
				flex: 1,
				justifyContent: 'center',
				alignItems: 'center',
			}}>
			<Text>LIST PAGE</Text>
		</SafeAreaView>
	);
}
