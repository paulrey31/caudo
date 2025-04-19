import { StyleSheet, Text, View } from 'react-native';

type TimerType = {
	time: string;
};

export default function Timer({ time }: TimerType) {
	return (
		<View style={styles.container}>
			<Text style={styles.text}>{time}</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		width: 100,
		height: 36,
		borderWidth: 2,
		borderColor: 'black',
		borderRadius: 5,
		alignItems: 'center',
		justifyContent: 'center',
	},
	text: {
		fontSize: 18,
		fontWeight: 700,
	},
});
