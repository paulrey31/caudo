import { View, TouchableOpacity, Text } from 'react-native';
import React from 'react';
import { FilterType } from '@/src/hooks/useListManager';

type Props = {
	currentFilter: FilterType;
	onChange: (value: FilterType) => void;
	counts: Record<FilterType, number>;
};

export default function ListFilterButton({
	currentFilter,
	onChange,
	counts,
}: Props) {
	const renderButton = (label: string, value: FilterType) => (
		<TouchableOpacity
			key={value}
			style={{
				paddingHorizontal: 12,
				paddingVertical: 8,
				backgroundColor: currentFilter === value ? '#333' : '#ccc',
				borderRadius: 12,
				marginRight: 8,
			}}
			onPress={() => onChange(value)}>
			<Text style={{ color: currentFilter === value ? '#fff' : '#000' }}>
				{label} {value !== 'all' ? '(' + counts[value] + ')' : null}
			</Text>
		</TouchableOpacity>
	);

	return (
		<View
			style={{
				flexDirection: 'row',
				padding: 12,
			}}>
			{renderButton('Tous', 'all')}
			{renderButton('Succès', 'success')}
			{renderButton('Échecs', 'fail')}
		</View>
	);
}
