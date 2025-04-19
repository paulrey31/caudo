import { StyleSheet, Text, View } from 'react-native';

type TagType = {
	label: string;
	color: string;
};

export default function Tag({ label, color }: TagType) {
	return (
		<View
			style={{
				width: 100,
				height: 36,
				backgroundColor: color,
				borderRadius: 5,
				alignItems: 'center',
				justifyContent: 'center',
			}}>
			<Text style={styles.text}>{label.toLocaleUpperCase()}</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	text: {
		fontSize: 14,
		fontWeight: 700,
		color: '#ffffff',
	},
});
