// librairie
import { View } from 'react-native';

// hooks
import ButtonFilter from '../ButtonFilter';

type ListFilterButtonType = {
	currentFilter: string;
	onChange: (value: string) => void;
	counts: Record<string, number>;
};

export default function ListFilterButton({
	currentFilter,
	onChange,
	counts,
}: ListFilterButtonType) {
	return (
		<View
			style={{
				flexDirection: 'row',
				padding: 12,
			}}>
			{/* BOUTON TOUS */}
			<ButtonFilter
				value='all'
				currentFilter={currentFilter}
				onChange={onChange}
				label='Tous'
				counts={counts}
			/>

			{/* BOUTON SUCCÈS */}
			<ButtonFilter
				value='success'
				currentFilter={currentFilter}
				onChange={onChange}
				label='Succès'
				counts={counts}
			/>

			{/* BOUTON ÉCHECS */}
			<ButtonFilter
				value='fail'
				currentFilter={currentFilter}
				onChange={onChange}
				label='Échecs'
				counts={counts}
			/>
		</View>
	);
}
