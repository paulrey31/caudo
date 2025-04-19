import { View } from 'react-native';
import List from '../components/list/List';

const solutions = [
	{
		id: 1,
		solution: [1, 3, 4, 8, 9, 6, 7, 5, 2],
		status: 'success',
	},
	{
		id: 2,
		solution: [1, 3, 4, 8, 9, 6, 7, 5, 2],
		status: 'failed',
	},
	{
		id: 3,
		solution: [1, 3, 4, 8, 9, 6, 7, 5, 2],
		status: 'success',
	},
	{
		id: 4,
		solution: [1, 3, 4, 8, 9, 6, 7, 5, 2],
		status: 'success',
	},
	{
		id: 5,
		solution: [1, 3, 4, 8, 9, 6, 7, 5, 2],
		status: 'failed',
	},
	{
		id: 6,
		solution: [1, 3, 4, 8, 9, 6, 7, 5, 2],
		status: 'success',
	},
	{
		id: 7,
		solution: [1, 3, 4, 8, 9, 6, 7, 5, 2],
		status: 'success',
	},
	{
		id: 8,
		solution: [1, 3, 4, 8, 9, 6, 7, 5, 2],
		status: 'failed',
	},
	{
		id: 9,
		solution: [1, 3, 4, 8, 9, 6, 7, 5, 2],
		status: 'success',
	},
	{
		id: 10,
		solution: [1, 3, 4, 8, 9, 6, 7, 5, 2],
		status: 'success',
	},
	{
		id: 11,
		solution: [1, 3, 4, 8, 9, 6, 7, 5, 2],
		status: 'failed',
	},
	{
		id: 12,
		solution: [1, 3, 4, 8, 9, 6, 7, 5, 2],
		status: 'success',
	},
];

export default function ListScreen() {
	return (
		<View style={{ flex: 1, paddingLeft: 8 }}>
			<List data={solutions} />
		</View>
	);
}
