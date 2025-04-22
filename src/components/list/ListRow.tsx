import { Animated, Pressable, StyleSheet, Text, View } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Tag from '../Tag';
import { ListRowType } from '@/src/types/list.type';
import useSwipeableListRowManager from '@/src/hooks/useSwipeableListRowManager';
import useSolutionsStore from '@/src/store/SolutionsStore';
import { useRouter } from 'expo-router';
import * as Haptics from 'expo-haptics';
import { useRef } from 'react';

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
	const rowTranslateX = useRef(new Animated.Value(0)).current;
	const rowOpacity = useRef(new Animated.Value(1)).current;

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

	const handleDelete = () => {
		Animated.parallel([
			Animated.timing(rowTranslateX, {
				toValue: -500, // part vite vers la gauche
				duration: 200,
				useNativeDriver: true,
			}),
			Animated.timing(rowOpacity, {
				toValue: 0,
				duration: 200,
				useNativeDriver: true,
			}),
		]).start(() => {
			removeSolution(id); // on supprime une fois la sortie finie
		});
	};

	// RETURN
	return (
		<Animated.View
			style={{
				...styles.container,
				transform: [
					{ translateX: rowTranslateX }, // empile le swipe + l'animation de sortie
				],
				opacity: rowOpacity,
			}}>
			{/* Bouton delete dessous */}
			<View style={styles.deleteButton}>
				<Pressable
					onPress={() => {
						Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
						handleDelete();
					}}>
					<Text style={styles.deleteText}>Supprimer</Text>
				</Pressable>
			</View>
			<Animated.View
				style={[
					styles.item,
					{
						transform: [{ translateX }],
					},
				]}
				{...panResponder.panHandlers}>
				{/* Zone pressable pour ouvrir la page */}
				<Pressable
					onPress={() => {
						Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
						router.push({
							pathname: '/solutionDetails',
							params: { id },
						});
					}}
					style={styles.item}>
					<View style={{ flexDirection: 'row', gap: 4 }}>
						{solution.map((item, index) => (
							<View
								key={index}
								style={styles.solution}>
								<Text style={styles.text}>{item}</Text>
							</View>
						))}
					</View>

					<View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
						<Tag
							label={status}
							color={status === 'success' ? 'green' : 'red'}
							size='small'
						/>
						<MaterialIcons
							name='keyboard-arrow-right'
							size={24}
							color='#ffffff'
						/>
					</View>
				</Pressable>
			</Animated.View>
		</Animated.View>
	);
}

const styles = StyleSheet.create({
	container: {
		width: '98%',
		height: 80,
		marginVertical: 5,
		justifyContent: 'center',
		position: 'relative',
	},

	item: {
		height: 80,
		width: '100%',
		backgroundColor: '#1E1E1E',
		padding: 8,
		marginVertical: 4,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		borderRadius: 5,
		elevation: 2,
		zIndex: 1,
	},
	deleteButton: {
		backgroundColor: '#ff3b30',
		position: 'absolute',
		right: 0,
		top: 0,
		bottom: 0,
		width: 105,
		justifyContent: 'center',
		alignItems: 'center',
		zIndex: 0,
		borderBottomRightRadius: 5,
		borderTopEndRadius: 5,
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
	deleteText: {
		color: '#fff',
		fontWeight: 'bold',
	},
});
