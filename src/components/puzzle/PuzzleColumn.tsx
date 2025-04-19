import { View } from 'react-native';
import PuzzleCell from './PuzzleCell';

type PuzzleColumnType = {
	column: object;
};

export default function PuzzleColumn({ column }: PuzzleColumnType) {
	return (
		<View>
			{Object.values(column).map((cell, index) => {
				// if (cell === 'empty_cell') return null;
				return (
					<PuzzleCell
						key={'cell_' + index}
						cell={cell}
					/>
				);
			})}
		</View>
	);
}
