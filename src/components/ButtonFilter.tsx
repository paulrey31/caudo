import { TouchableOpacity, Text } from 'react-native';
import * as Haptics from 'expo-haptics';

type ButtonFilterType = {
	value: string;
	currentFilter: string;
	onChange: (value: string) => void;
	label: string;
	counts: Record<string, number>;
};

export default function ButtonFilter({
	value,
	currentFilter,
	onChange,
	label,
	counts,
}: ButtonFilterType) {
	return (
		<TouchableOpacity
			key={value}
			style={{
				paddingHorizontal: 12,
				paddingVertical: 8,
				backgroundColor: currentFilter === value ? '#333' : '#ccc',
				borderRadius: 12,
				marginRight: 8,
			}}
			onPress={() => {
				Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
				onChange(value);
			}}>
			<Text style={{ color: currentFilter === value ? '#fff' : '#000' }}>
				{label} {value !== 'all' ? '(' + counts[value] + ')' : null}
			</Text>
		</TouchableOpacity>
	);
}
