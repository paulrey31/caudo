import { StyleSheet, Text, View } from 'react-native';

type SizeType = 'small' | 'medium' | 'big';

type TagType = {
	label: string;
	color: string;
	size?: SizeType;
};

function calculateSize({ size = 'medium' }) {
	// default size
	let height = 36;
	let width = 100;
	let fontSize = 16;

	// small size
	if (size === 'small') {
		height = 28;
		width = 80;
		fontSize = 12;
	}

	// big size
	if (size === 'big') {
		height = 44;
		width = 120;
		fontSize = 20;
	}

	// return
	return {
		height,
		width,
		fontSize,
	};
}

export default function Tag({ label, color, size }: TagType) {
	// get the size
	const { height, width, fontSize } = calculateSize({ size });

	// return
	return (
		<View
			style={{
				...styles.container,
				width: width,
				height: height,
				backgroundColor: color,
			}}>
			<Text style={{ ...styles.text, fontSize: fontSize }}>
				{label.toLocaleUpperCase()}
			</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		width: 100,
		height: 36,
		backgroundColor: '#ffffff',
		borderRadius: 20,
		alignItems: 'center',
		justifyContent: 'center',
	},
	text: {
		fontSize: 14,
		fontWeight: 700,
		color: '#ffffff',
	},
});
