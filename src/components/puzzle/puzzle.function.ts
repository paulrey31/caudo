import { SolutionType } from '@/src/types/SolutionsType';

type Solution = [
	number,
	number,
	number,
	number,
	number,
	number,
	number,
	number,
	number,
];
// Fonction principale de calcul
function func(
	a: number,
	b: number,
	c: number,
	d: number,
	e: number,
	f: number,
	g: number,
	h: number,
	i: number,
): number {
	return a + (13 * b) / c + d + 12 * e - f - 11 + (g * h) / i - 10;
}

// Génère un tableau aléatoire de chiffres de 1 à 9
export function generateRandomSolution(): Solution {
	const arr: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9];
	for (let i = arr.length - 1; i > 0; i--) {
		const j: number = Math.floor(Math.random() * (i + 1));
		[arr[i], arr[j]] = [arr[j], arr[i]];
	}
	return arr as Solution;
}

// Vérifie si la solution est correcte (== 66)
export function evaluateSolution(solution: Solution): 'success' | 'fail' {
	const result = func(...solution);
	return Math.abs(result - 66) < 1e-6 ? 'success' : 'fail';
}

// Fonction pour générer un id
function generateId(): string {
	return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
		const r = (Math.random() * 16) | 0;
		const v = c === 'x' ? r : (r & 0x3) | 0x8;
		return v.toString(16);
	});
}

// Fonction principale
export function createSolutionObject(): SolutionType {
	const solution = generateRandomSolution();
	const status = evaluateSolution(solution);
	const id = generateId();

	return {
		id,
		solution,
		status,
	};
}
