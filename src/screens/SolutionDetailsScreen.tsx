// LIBRAIRIE
import { TouchableOpacity, StyleSheet, Text, View } from 'react-native';

// COMPONENTS
import Tag from '../components/Tag';
import Puzzle from '../components/puzzle/Puzzle';
import { columns } from '../components/puzzle/puzzle.contant';
import { useLocalSearchParams } from 'expo-router';
import useSolutionDetailsManager from '../hooks/useSolutionDetailsManager';

export default function SolutionDetailsScreen() {
	const { id } = useLocalSearchParams();

	// check if id is array
	const solutionId = Array.isArray(id) ? id[0] : id;

	// HOOKs
	const { state } = useSolutionDetailsManager({ id: solutionId });

	// render
	return (
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
				{/* <TouchableOpacity
					style={{
						...styles.buttonSave,
						backgroundColor: state.length === 0 ? '#BBBBBB' : '#E16A54',
					}}
					disabled={state.length === 0}
					onPress={() => onSaveSolution()}>
					<Text
						style={{
							...styles.txtButton,
							color: state.length === 0 ? '#DCD7C9' : '#ffffff',
						}}>
						Save
					</Text>
				</TouchableOpacity> */}
			</View>
			{/* PUZZLE */}
			<View style={styles.body}>
				<Puzzle columns={columns} />
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 20,
		gap: 20,
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
		flex: 1,
		width: '100%',

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
