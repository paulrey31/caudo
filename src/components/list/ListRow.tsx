import {
	Animated,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Tag from '../Tag';
import { ListRowType } from '@/src/types/list.type';
import useSwipeableListRowManager from '@/src/hooks/useSwipeableListRowManager';
import useSolutionsStore from '@/src/store/SolutionsStore';
import { useRouter } from 'expo-router';

export default function ListRow({
	item,
	onSwipeStart,
	onSwipeEnd,
	registerOpenRow,
}: ListRowType & {
	onSwipeStart?: () => void;
	onSwipeEnd?: () => void;
	registerOpenRow: (fn: () => void) => void;
}) {
	const router = useRouter();

	// GET DATA NEEDED
	const { id, solution, status } = item;

	// GET SWIPEABLE
	const { translateX, panResponder } = useSwipeableListRowManager({
		onSwipeStart,
		onSwipeEnd,
		registerOpenRow,
	});

	// Récupérer la liste des solutions et les actions du store
	const removeSolution = useSolutionsStore((state) => state.removeSolution);

	// RETURN
	return (
		<TouchableOpacity
			style={styles.container}
			onPress={() =>
				router.push({
					pathname: '/SolutionDetails',
					params: { id },
				})
			}>
			<TouchableOpacity
				style={styles.deleteButton}
				onPress={() => removeSolution(id)}>
				<Text style={styles.deleteText}>Supprimer</Text>
			</TouchableOpacity>

			<Animated.View
				style={[styles.item, { transform: [{ translateX }] }]}
				{...panResponder.panHandlers}>
				{/* SOLUTION */}
				{solution.map((item, index) => {
					return (
						<View
							key={index}
							style={styles.solution}>
							<Text style={styles.text}>{item}</Text>
						</View>
					);
				})}
				{/* TAG */}
				<Tag
					label={status}
					color={status === 'success' ? 'green' : 'red'}
					size='small'
				/>
				{/* ICON */}
				<MaterialIcons
					name='keyboard-arrow-right'
					size={24}
					color='#ffffff'
				/>
			</Animated.View>
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	container: {
		width: '100%',
		height: 80,
		marginVertical: 5,
		justifyContent: 'center',
	},
	item: {
		height: 80,
		width: '98%',

		backgroundColor: '#1E1E1E',

		padding: 8,
		marginVertical: 4,

		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',

		borderRadius: 5,

		elevation: 2,
		zIndex: 1,
	},
	solution: {
		height: 20,
		width: 20,

		alignItems: 'center',
		justifyContent: 'center',

		backgroundColor: '#FFFFFF',

		borderRadius: 5,
		marginRight: 4,
	},
	text: {
		fontSize: 16,
		fontWeight: 700,
		// color: '#ffffff',
	},
	deleteButton: {
		backgroundColor: '#ff3b30',
		position: 'absolute',
		right: 12,
		top: 0,
		bottom: 0,
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 5,
		width: 100,
		zIndex: 0,
	},
	deleteText: {
		color: '#fff',
		fontWeight: 'bold',
	},
});
