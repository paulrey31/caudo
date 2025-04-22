// librairie
import { FlatList, View } from 'react-native';
import * as Haptics from 'expo-haptics';

// components
import ListRow from '@/src/components/list/ListRow';
import ListEmpty from '@/src/components/list/ListEmpty';

// hooks
import useSwipeableListControl from '@/src/hooks/useSwipeableListControl';
import useListManager from '@/src/hooks/useListManager';
import ListFilterButton from '@/src/components/list/ListFilterButton';
import useSolutionsStore from '@/src/store/SolutionsStore';
import { ListFilterType } from '@/src/types/list.type';
import { deleteAllSolutions } from '@/src/services/api';
import Button from '@/src/components/Button';

export default function List() {
	// store zustang
	const solutions = useSolutionsStore((state) => state.solutions);
	const clearSolutions = useSolutionsStore((state) => state.clearSolutions);

	// HOOKS
	const { registerOpenRow } = useSwipeableListControl();
	const {
		scrollEnabled,
		filter,
		isLoading,
		setFilter,
		setScrollEnabled,
		setIsLoading,
		filteredSolutions,
		counts,
	} = useListManager(solutions);

	// if no data, return list empty
	if (solutions.length === 0) return <ListEmpty />;

	// return
	return (
		<View style={{ flex: 1, paddingLeft: 8 }}>
			{/* FILTER */}
			<ListFilterButton
				currentFilter={filter}
				onChange={(value) => setFilter(value as ListFilterType)}
				counts={counts}
			/>
			{/* LIST */}
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
			{/* DELETE ALL SOLUTION */}
			<View style={{ marginBottom: 12, marginTop: 12 }}>
				<Button
					label='Supprimer toute les solutions'
					onPress={async () => {
						setIsLoading(true);
						Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
						try {
							await deleteAllSolutions();
						} catch (e) {
							console.error('Erreur générale :', e);
						}
						clearSolutions();
						setIsLoading(false);
					}}
					color='#1E1E1E'
					height={60}
					width='98%'
					disabled={isLoading}
					isLoading={isLoading}
				/>
			</View>
		</View>
	);
}
