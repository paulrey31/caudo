import { FlatList, Text, View } from 'react-native';
import ListRow from './ListRow';

export default function List({ data }) {
	return (
		<FlatList
			data={data}
			renderItem={({ item }) => <ListRow row={item} />}
			ListEmptyComponent={
				<View>
					<Text>No solution save</Text>
				</View>
			}
			keyExtractor={(item) => item.id.toString()}
			initialNumToRender={10}
		/>
	);
}
