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

function formatDuration(ms: number): string {
	const totalSeconds = ms / 1000;
	const minutes = Math.floor(totalSeconds / 60);
	const seconds = totalSeconds % 60;

	// Format : 00m00.000s
	return `${minutes.toString().padStart(2, '0')}m${seconds.toFixed(3).padStart(6, '0')}s`;
}

/**
 * Génère récursivement toutes les permutations possibles des chiffres de 1 à 9,
 * les évalue via `func`, et stocke uniquement les solutions valides (== 66).
 * Retourne également le temps d'exécution.
 */
export function findAllValidSolutions(): {
	solutions: SolutionType[];
	duration: string;
} {
	const results: SolutionType[] = [];

	const digits = [1, 2, 3, 4, 5, 6, 7, 8, 9];

	// Capture le temps de début
	const startTime = performance.now();

	/**
	 * Fonction récursive pour générer les permutations.
	 * Utilise Heap's algorithm pour la performance.
	 */
	function permute(arr: number[], n = arr.length) {
		if (n === 1) {
			// Une permutation complète est trouvée
			const candidate = arr as Solution;
			const result = func(...candidate);
			if (Math.abs(result - 66) < 1e-6) {
				results.push({
					id: generateId(),
					solution: [...candidate],
					status: 'success',
				});
			}
			return;
		}

		for (let i = 0; i < n; i++) {
			permute(arr, n - 1);
			const j = n % 2 === 0 ? i : 0;
			[arr[n - 1], arr[j]] = [arr[j], arr[n - 1]]; // Swap pour générer nouvelle permutation
		}
	}

	// Lancer le générateur
	permute(digits);

	// Capture le temps de fin
	const endTime = performance.now();
	const durationMs = endTime - startTime;
	const duration = formatDuration(durationMs);

	console.log(
		`✅ ${results.length} solution(s) trouvée(s) en ${durationMs.toFixed(2)} ms`,
	);

	return {
		solutions: results,
		duration,
	};
}
