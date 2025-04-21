import { View } from 'react-native';
import PuzzleCell from './PuzzleCell';
import { SolutionType } from '@/src/types/SolutionsType';

type PuzzleColumnType = {
	state: SolutionType;
	column: object;
};

export default function PuzzleColumn({
	state,
	column,
	updateSolutionAtIndex,
}: PuzzleColumnType) {
	return (
		<View style={{ flex: 1 }}>
			{Object.values(column).map((cell, index) => {
				return (
					<PuzzleCell
						key={'cell_' + index}
						index={index}
						state={state}
						cell={cell}
						updateSolutionAtIndex={updateSolutionAtIndex}
					/>
				);
			})}
		</View>
	);
}
