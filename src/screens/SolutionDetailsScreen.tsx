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
import Tag from '../components/Tag';
import Puzzle from '../components/puzzle/Puzzle';

// store
import useSolutionsStore from '../store/SolutionsStore';

// hooks
import useSolutionDetailsManager from '../hooks/useSolutionDetailsManager';

export default function SolutionDetailsScreen() {
	// store zustang
	const updateSolution = useSolutionsStore((state) => state.updateSolution);
	const removeSolution = useSolutionsStore((state) => state.removeSolution);

	// params
	const { id } = useLocalSearchParams();

	// check if id is array
	const solutionId = Array.isArray(id) ? id[0] : id;

	// HOOKs
	const { state, isUpdated, columns, updateSolutionAtIndex } =
		useSolutionDetailsManager({
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
							backgroundColor: !isUpdated ? '#BBBBBB' : '#E16A54',
						}}
						disabled={!isUpdated}
						onPress={() => {
							Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
							updateSolution(solutionId, state.solution, state.status);
						}}>
						<Text
							style={{
								...styles.txtButton,
								color: !isUpdated ? '#DCD7C9' : '#ffffff',
							}}>
							Update
						</Text>
					</TouchableOpacity>
				</View>
				{/* PUZZLE */}
				<View style={styles.body}>
					<Puzzle
						state={state}
						columns={columns}
						updateSolutionAtIndex={updateSolutionAtIndex}
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
