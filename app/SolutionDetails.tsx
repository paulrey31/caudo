// libraire
import {
	TouchableOpacity,
	StyleSheet,
	Text,
	View,
	TouchableWithoutFeedback,
	Keyboard,
} from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import * as Haptics from 'expo-haptics';

// components
import Tag from '@/src/components/Tag';

// store
import useSolutionsStore from '@/src/store/SolutionsStore';

// hooks
import useSolutionDetailsManager from '@/src/hooks/useSolutionDetailsManager';
import { PuzzleGrid } from '@/src/components/puzzle/PuzzleGrid';

export default function SolutionDetailsScreen() {
	// store zustang
	const removeSolution = useSolutionsStore((state) => state.removeSolution);
	const updateSolution = useSolutionsStore((state) => state.updateSolution);

	// params
	const { id } = useLocalSearchParams();

	// check if id is array
	const solutionId = Array.isArray(id) ? id[0] : id;

	// HOOKs
	const { state, isUpdated, handleUpdateSolution } = useSolutionDetailsManager({
		id: solutionId,
	});

	// render
	return (
		<TouchableWithoutFeedback
			onPress={Keyboard.dismiss}
			accessible={false}>
			<View style={styles.container}>
				{/* STATUS + TIMER */}
				<View style={styles.header}>
					<Tag
						label={state.status || 'Empty'}
						color={
							state.status
								? state.status === 'success'
									? 'green'
									: 'red'
								: '#BBBBBB'
						}
					/>
					<TouchableOpacity
						style={{
							...styles.buttonSave,
							backgroundColor:
								!isUpdated || state.status === 'error' ? '#BBBBBB' : '#E16A54',
						}}
						disabled={!isUpdated || state.status === 'error'}
						onPress={() => {
							Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
							updateSolution(solutionId, state.solution, state.status);
						}}>
						<Text
							style={{
								...styles.txtButton,
								color:
									!isUpdated || state.status === 'error'
										? '#DCD7C9'
										: '#ffffff',
							}}>
							Update
						</Text>
					</TouchableOpacity>
				</View>
				{/* PUZZLE */}
				<View style={styles.body}>
					<PuzzleGrid
						solution={state.solution}
						handleUpdateSolution={handleUpdateSolution}
					/>
				</View>
				{/* FOOTER */}
				<View style={styles.footer}>
					<TouchableOpacity
						style={styles.button}
						onPress={() => {
							Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
							removeSolution(solutionId);
							router.back();
						}}>
						<Text style={styles.txtButton}>Supprimer la solution</Text>
					</TouchableOpacity>
				</View>
			</View>
		</TouchableWithoutFeedback>
	);
}

const styles = StyleSheet.create({
	container: {
		height: '100%',
		padding: 20,
		gap: 20,

		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'flex-start',
		alignItems: 'flex-start',
	},
	header: {
		width: '100%',

		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'flex-start',
	},
	buttonSave: {
		width: 100,
		height: 36,

		backgroundColor: '#E16A54',
		borderRadius: 5,

		alignItems: 'center',
		justifyContent: 'center',
	},
	body: {
		width: '100%',
		height: '50%',

		alignItems: 'center',
		justifyContent: 'center',

		borderWidth: 2,
		borderColor: 'black',
		borderRadius: 5,
	},
	footer: {
		height: 60,
		width: '100%',
		alignItems: 'center',
		justifyContent: 'center',
	},
	button: {
		height: '100%',
		width: '100%',
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#1E1E1E',
		borderRadius: 5,
	},
	txtButton: {
		fontSize: 20,
		fontWeight: 700,
		color: '#ffffff',
	},
});
