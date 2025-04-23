// Librairie
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

// Types
import {
	SolutionsActionsType,
	SolutionsStateType,
	SolutionStatus,
} from '../types/solution.type';

// Functions
import { createCustomStorage } from '../functions/solution.function';

// Store des Solutions
const useSolutionsStore = create<SolutionsStateType & SolutionsActionsType>()(
	persist(
		(set, get) => ({
			solutions: [],
			// Ajout de la solution
			addSolution: (newSolution) =>
				set((state) => ({
					solutions: [...state.solutions, newSolution],
				})),
			// Ajout des solutions
			addAllSolutions: (newSolutions) =>
				set(() => ({
					solutions: [...newSolutions],
				})),
			// Supprime tout les solutions
			clearSolutions: () =>
				set({
					solutions: [],
				}),
			// Supprime une solution
			removeSolution: (id) =>
				set((state) => ({
					solutions: state.solutions.filter((sol) => sol.id !== id),
				})),
			// Récupère une solution
			getSolutionById: (id) => {
				const solution = get().solutions.find((sol) => sol.id === id);
				if (!solution) throw new Error(`Solution with id ${id} not found`);
				return solution;
			},
			// Update de la solution
			updateSolutionById: (id, newSolution, newStatus) =>
				set((state) => {
					const index = state.solutions.findIndex((s) => s.id === id);
					if (index === -1) return {};

					const updatedSolutions = [...state.solutions];
					const existing = updatedSolutions[index];

					updatedSolutions[index] = {
						...existing,
						solution: newSolution,
						status: newStatus as SolutionStatus,
					};

					return { solutions: updatedSolutions };
				}),
		}),
		{
			name: 'solutions-storage', // Le nom utilisé pour stocker les données
			storage: createJSONStorage(() => createCustomStorage()),
		},
	),
);

export default useSolutionsStore;
