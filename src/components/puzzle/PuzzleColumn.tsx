import { View } from 'react-native';
import PuzzleCell from './PuzzleCell';

type PuzzleColumnType = {
	column: object;
};

export default function PuzzleColumn({ column }: PuzzleColumnType) {
	return (
		<View style={{ flex: 1 }}>
			{Object.values(column).map((cell, index) => {
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
