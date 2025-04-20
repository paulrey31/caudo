import { FlatList, View } from 'react-native';
import ListRow from './ListRow';
import { SolutionsStateType } from '@/src/types/SolutionsType';
import ListEmpty from './ListEmpty';
import { useState } from 'react';
import useSwipeableListControl from '@/src/hooks/useSwipeableListControl';

export default function List({ solutions }: SolutionsStateType) {
	// STATE
	const [scrollEnabled, setScrollEnabled] = useState(true);

	// HOOKS
	const { registerOpenRow } = useSwipeableListControl();

	// if no data, return list empty
	if (solutions.length === 0) return <ListEmpty />;

	// return
	return (
		<View style={{ flex: 1 }}>
			<FlatList
				data={solutions}
				scrollEnabled={scrollEnabled}
				keyExtractor={(item) => item.id}
				renderItem={({ item }) => (
					<ListRow
						item={item}
						onSwipeStart={() => setScrollEnabled(false)}
						onSwipeEnd={() => setScrollEnabled(true)}
						registerOpenRow={registerOpenRow}
					/>
				)}
			/>
		</View>
	);
}
