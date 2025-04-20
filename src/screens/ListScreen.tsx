import { View } from 'react-native';
import List from '../components/list/List';
import useSolutionsStore from '../store/SolutionsStore';

export default function ListScreen() {
	// get all solutions stored
	const solutions = useSolutionsStore((state) => state.solutions);

	// return
	return (
		<View style={{ flex: 1, paddingLeft: 8 }}>
			<List solutions={solutions} />
		</View>
	);
}
