import {
	ActivityIndicator,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from 'react-native';

type ButtonType = {
	label: string;
	color: string;
	height: number | `${number}%`;
	width: number | `${number}%`;
	disabled: boolean;
	isLoading: boolean;
	onPress: () => void;
};

export default function Button({
	label,
	color,
	height,
	width,
	disabled,
	isLoading,
	onPress,
}: ButtonType) {
	return (
		<TouchableOpacity
			style={{
				...styles.button,
				backgroundColor: color,
				height: height,
				width: width,
			}}
			onPress={() => onPress()}
			disabled={disabled}>
			<View style={styles.row}>
				<Text style={styles.txtButton}>{label}</Text>
				{isLoading && (
					<View style={styles.loaderWrapper}>
						<ActivityIndicator
							size='small'
							color='#fff'
						/>
					</View>
				)}
			</View>
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	button: {
		height: 60,
		width: '100%',
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#1E1E1E',
		borderRadius: 5,
	},
	row: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		gap: 10,
	},
	loaderWrapper: {
		marginLeft: 8,
	},
	txtButton: {
		fontSize: 20,
		fontWeight: 700,
		color: '#ffffff',
	},
});
