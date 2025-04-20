import { FlatList } from 'react-native';
import ListRow from './ListRow';
import { SolutionsStateType } from '@/src/types/SolutionsType';
import ListEmpty from './ListEmpty';

export default function List({ solutions }: SolutionsStateType) {
	if (solutions.length === 0) return <ListEmpty />;

	return (
		<FlatList
			data={solutions}
			renderItem={({ item }) => <ListRow item={item} />}
			keyExtractor={(item) => item.id.toString()}
			initialNumToRender={10}
		/>
	);
}
