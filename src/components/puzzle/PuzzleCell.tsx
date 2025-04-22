import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

type Props = {
	type: 'input' | 'fixed';
	value?: string;
	visible?: boolean;
	inputValue?: number | null;
	onChange?: (val: number | null) => void;
	onBlur?: () => void;
};

export default function PuzzleCell(props: Props) {
	if (props.type === 'fixed') {
		return (
			<View style={props.visible ? styles.cell : styles.cellHidden}>
				<Text style={styles.text}>{props.value}</Text>
			</View>
		);
	}

	return (
		<View style={styles.cell}>
			<TextInput
				style={styles.input}
				keyboardType='number-pad'
				maxLength={1}
				value={props.inputValue?.toString() || ''}
				onChangeText={(text) => {
					const parsed = parseInt(text, 10);
					props.onChange?.(isNaN(parsed) ? null : parsed);
				}}
				onBlur={props.onBlur}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	cell: {
		width: 45,
		height: 45,
		borderWidth: 1,
		borderColor: '#000',
		borderRadius: 5,
		justifyContent: 'center',
		alignItems: 'center',
	},
	cellHidden: {
		width: 45,
		height: 45,
	},
	text: {
		fontSize: 16,
	},
	input: {
		fontSize: 20,
		textAlign: 'center',
		width: '100%',
		height: '100%',
		fontWeight: 'bold',
		backgroundColor: '#EBE8DB',
		borderRadius: 4,
	},
});
