// librairie
import { FlatList, View } from 'react-native';

// components
import ListRow from './ListRow';
import ListEmpty from './ListEmpty';

// types
import { SolutionsStateType } from '@/src/types/SolutionsType';

// hooks
import useSwipeableListControl from '@/src/hooks/useSwipeableListControl';
import useListManager from '@/src/hooks/useListManager';
import ListFilterButton from './ListFilterButton';

export default function List({ solutions }: SolutionsStateType) {
	// HOOKS
	const { registerOpenRow } = useSwipeableListControl();
	const {
		scrollEnabled,
		filter,
		setFilter,
		setScrollEnabled,
		filteredSolutions,
		counts,
	} = useListManager(solutions);

	// if no data, return list empty
	if (filteredSolutions.length === 0) return <ListEmpty />;

	// return
	return (
		<View style={{ flex: 1 }}>
			<ListFilterButton
				currentFilter={filter}
				onChange={setFilter}
				counts={counts}
			/>
			<FlatList
				data={filteredSolutions}
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
				initialNumToRender={20}
				maxToRenderPerBatch={20}
				windowSize={5}
			/>
		</View>
	);
}
