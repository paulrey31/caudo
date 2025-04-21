// Librairie
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Types
import {
	SolutionsActionsType,
	SolutionsStateType,
} from '../types/SolutionsType';

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
			getSolutionById: (id) => get().solutions.find((sol) => sol.id === id), // Recherche de la solution par ID
		}),
		{
			name: 'solutions-storage', // Le nom utilisé pour stocker les données
			storage: createJSONStorage(() => AsyncStorage), // Utilisation de sessionStorage
		},
	),
);

export default useSolutionsStore;
