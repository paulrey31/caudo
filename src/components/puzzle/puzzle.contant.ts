import { SolutionType } from '@/src/types/list.type';

const column_1 = {
	1_1: '',
	1_2: '+',
	1_3: '13',
	1_4: 'x',
	1_5: '',
	1_6: ':',
};
const column_2 = {
	2_1: 'empty_cell',
	2_2: 'empty_cell',
	2_3: 'empty_cell',
	2_4: 'empty_cell',
	2_5: 'empty_cell',
	2_6: '',
};

const column_3 = {
	3_1: '',
	3_2: 'x',
	3_3: '12',
	3_4: '+',
	3_5: '',
	3_6: '+',
};

const column_4 = {
	4_1: '-',
	4_2: 'empty_cell',
	4_3: 'empty_cell',
	4_4: 'empty_cell',
	4_5: 'empty_cell',
	4_6: 'empty_cell',
};

const column_5 = {
	5_1: '',
	5_2: '-',
	5_3: '11',
	5_4: '+',
	5_5: '',
	5_6: 'x',
};

const column_6 = {
	6_1: 'empty_cell',
	6_2: 'empty_cell',
	6_3: 'empty_cell',
	6_4: 'empty_cell',
	6_5: 'empty_cell',
	6_6: '',
};

const column_7 = {
	7_1: '66',
	7_2: '=',
	7_3: '10',
	7_4: '-',
	7_5: '',
	7_6: ':',
};
export const columns = [
	column_1,
	column_2,
	column_3,
	column_4,
	column_5,
	column_6,
	column_7,
];

export const availableNumbers: SolutionType = [1, 2, 3, 4, 5, 6, 7, 8, 9];
