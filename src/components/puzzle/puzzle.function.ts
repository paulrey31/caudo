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

type SolutionVariant = 'one' | 'valid' | 'invalid' | 'all';

// Fonction mathématique principale : cherche à faire exactement 66
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
	// Calcul basé sur une règle fixe
	return a + (13 * b) / c + d + 12 * e - f - 11 + (g * h) / i - 10;
}

// 🔧 Génère un UUID-like pour identifier chaque solution
function generateId(): string {
	return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
		const r = (Math.random() * 16) | 0;
		const v = c === 'x' ? r : (r & 0x3) | 0x8;
		return v.toString(16);
	});
}

// Formatte une durée en ms → "00m05.123s"
function formatDuration(ms: number): string {
	// init
	const totalSeconds = ms / 1000;
	const minutes = Math.floor(totalSeconds / 60);
	const seconds = totalSeconds % 60;

	// return
	return `${minutes.toString().padStart(2, '0')}m${seconds.toFixed(3).padStart(6, '0')}s`;
}

// Génère une permutation aléatoire des chiffres 1 à 9 (sans doublon)
function generateRandomSolution(): Solution {
	// init
	const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];

	// loop
	for (let i = arr.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[arr[i], arr[j]] = [arr[j], arr[i]]; // swap
	}

	// return
	return arr as Solution;
}

/**
 * Fonction principale — générique et configurable
 * @param variant détermine quel type de résultat on veut ("one", "valid", "invalid", "all")
 */
export function getSolutions(variant: SolutionVariant): {
	solutions: SolutionType[];
	duration: string;
} {
	const results: SolutionType[] = [];
	const digits = [1, 2, 3, 4, 5, 6, 7, 8, 9];
	const start = performance.now();

	// Cas 1 : on veut UNE solution aléatoire
	if (variant === 'one') {
		const sol = generateRandomSolution();
		const status: 'success' | 'fail' =
			Math.abs(func(...sol) - 66) < 1e-6 ? 'success' : 'fail';

		results.push({
			id: generateId(),
			solution: sol,
			status,
		});

		const end = performance.now();
		return {
			solutions: results,
			duration: formatDuration(end - start),
		};
	}

	/**
	 * Cas 2 : on veut TOUTES les permutations
	 * La fonction ci-dessous utilise Heap’s algorithm pour générer les 362 880 permutations possibles (9!)
	 * Pour chaque permutation, on :
	 * - évalue le calcul
	 * - vérifie s’il est égal à 66 (ou non)
	 * - stocke selon le filtre choisi
	 */
	function permute(arr: number[], n = arr.length) {
		if (n === 1) {
			const candidate = arr as Solution;
			const result = func(...candidate);
			const status: 'success' | 'fail' =
				Math.abs(result - 66) < 1e-6 ? 'success' : 'fail';

			// On stocke la solution si elle correspond au filtre choisi
			if (
				(variant === 'valid' && status === 'success') ||
				(variant === 'invalid' && status === 'fail') ||
				variant === 'all'
			) {
				results.push({
					id: generateId(),
					solution: [...candidate],
					status,
				});
			}

			return;
		}

		// Heap's Algorithm pour générer toutes les permutations
		for (let i = 0; i < n; i++) {
			permute(arr, n - 1);
			const j = n % 2 === 0 ? i : 0;
			[arr[n - 1], arr[j]] = [arr[j], arr[n - 1]]; // échange
		}
	}

	// Exécution de la génération complète
	permute(digits);

	const end = performance.now();

	return {
		solutions: results,
		duration: formatDuration(end - start),
	};
}
