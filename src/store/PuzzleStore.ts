import { create } from 'zustand';

type State = {
	gridData: Record<string, number | undefined>;
	availableNumbers: number[];
	onDrop: (cellKey: string, value: number) => void;
	pickNumber: (num: number) => void;
};

export const usePuzzleStore = create<State>((set) => ({
	gridData: {},
	availableNumbers: [1, 2, 3, 4, 5, 6, 7, 8, 9],
	onDrop: (cellKey, value) =>
		set((state) => {
			if (!state.availableNumbers.includes(value)) return state;

			const newGrid = { ...state.gridData, [cellKey]: value };
			const newAvailable = state.availableNumbers.filter((n) => n !== value);
			return { gridData: newGrid, availableNumbers: newAvailable };
		}),
	pickNumber: (num) => {},
}));
