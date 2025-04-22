// librairie
import {
	FlatList,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from 'react-native';
import * as Haptics from 'expo-haptics';

// components
import ListRow from '@/src/components/list/ListRow';
import ListEmpty from '@/src/components/list/ListEmpty';

// hooks
import useSwipeableListControl from '@/src/hooks/useSwipeableListControl';
import useListManager from '@/src/hooks/useListManager';
import ListFilterButton from '@/src/components/list/ListFilterButton';
import useSolutionsStore from '@/src/store/SolutionsStore';

export default function List() {
	// store zustang
	const solutions = useSolutionsStore((state) => state.solutions);
	const clearSolutions = useSolutionsStore((state) => state.clearSolutions);

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
	if (solutions.length === 0) return <ListEmpty />;

	// return
	return (
		<View style={{ flex: 1, paddingLeft: 8 }}>
			{/* FILTER */}
			<ListFilterButton
				currentFilter={filter}
				onChange={setFilter}
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
			<TouchableOpacity
				style={styles.button}
				onPress={() => {
					Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
					clearSolutions();
				}}>
				<Text style={styles.txtButton}>Supprimer toute les solutions</Text>
			</TouchableOpacity>
		</View>
	);
}

const styles = StyleSheet.create({
	button: {
		height: 52,
		width: '98%',
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#1E1E1E',
		borderRadius: 5,
		marginTop: 12,
		marginBottom: 12,
	},
	txtButton: {
		fontSize: 20,
		fontWeight: 700,
		color: '#ffffff',
	},
});
