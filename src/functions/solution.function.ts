import { Platform } from 'react-native';
import {
	SolutionStatus,
	SolutionType,
	SolutionVariant,
} from '../types/solution.type';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Exporter le type SolutionVariant pour qu'il soit accessible depuis d'autres fichiers
export { SolutionVariant };

type SolutionTuple = [
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

/**
 * Fonction mathématique qui calcule le résultat d'une solution
 *
 * @param a - Premier chiffre
 * @param b - Deuxième chiffre
 * @param c - Troisième chiffre
 * @param d - Quatrième chiffre
 * @param e - Cinquième chiffre
 * @param f - Sixième chiffre
 * @param g - Septième chiffre
 * @param h - Huitième chiffre
 * @param i - Neuvième chiffre
 * @returns Le résultat du calcul
 */
function calculateResult(
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

/**
 * Génère un identifiant unique aléatoire
 *
 * @returns Un identifiant aléatoire sous forme de chaîne de caractères
 */
function generateId(): string {
	return Math.random().toString(36).slice(2, 10);
}

/**
 * Formate une durée en millisecondes en une chaîne lisible
 *
 * @param ms - Durée en millisecondes
 * @returns Durée formatée au format "MMmSS.sss"
 */
function formatDuration(ms: number): string {
	const totalSeconds = ms / 1000;
	const minutes = Math.floor(totalSeconds / 60);
	const seconds = totalSeconds % 60;
	return `${minutes.toString().padStart(2, '0')}m${seconds.toFixed(3).padStart(6, '0')}s`;
}

/**
 * Vérifie si une solution est valide
 *
 * Une solution valide doit :
 * - Contenir exactement 9 chiffres
 * - Utiliser uniquement des chiffres de 1 à 9
 * - Ne pas contenir de doublons
 *
 * @param solution - Tableau de chiffres à vérifier
 * @returns true si la solution est valide, false sinon
 */
export function calculateSolutionStatus(
	solution: (number | null)[],
): SolutionStatus {
	// Vérifie qu'il y a exactement 9 éléments
	if (solution.length !== 9) return 'error';

	const seen = new Set<number>();

	for (const num of solution) {
		// Doit être entre 1 et 9
		if (num === null || num < 1 || num > 9) return 'error';

		// Pas de doublon
		if (seen.has(num)) return 'error';

		seen.add(num);
	}

	const result = calculateResult(...(solution as SolutionTuple));
	// return success or fail
	return Math.abs(result - 66) < 1e-6 ? 'success' : 'fail';
}

/**
 * Génère des solutions selon le mode spécifié
 *
 * Cette fonction utilise un algorithme de backtracking pour générer toutes les solutions possibles
 * ou une solution aléatoire selon le variant spécifié.
 *
 * @param variant - Type de solutions à générer ('manual', 'random', 'all-valid', 'all-invalid', 'all')
 * @returns Un objet contenant les solutions générées, la durée de génération et la durée en ms
 */
export async function generateSolutionsSmart(
	variant: SolutionVariant,
): Promise<{
	solutions: SolutionType[];
	duration: string;
}> {
	// init
	const start = performance.now();
	const digits = [1, 2, 3, 4, 5, 6, 7, 8, 9];
	const used = new Set<number>();
	const results: SolutionType[] = [];

	// Mode aléatoire : génère une seule solution aléatoire
	if (variant === 'random') {
		const shuffled = [...digits].sort(() => Math.random() - 0.5);
		const result = calculateResult(...(shuffled as SolutionTuple));
		const status = Math.abs(result - 66) < 1e-6 ? 'success' : 'fail';

		// return
		return {
			solutions: [
				{
					id: generateId(),
					solution: shuffled as SolutionTuple,
					status,
				},
			],
			duration: formatDuration(performance.now() - start),
		};
	}

	const current: number[] = [];

	/**
	 * Fonction récursive avec backtracking
	 * Explore toutes les permutations possibles des chiffres de 1 à 9
	 *
	 * @param depth - Profondeur actuelle dans l'arbre de recherche
	 */
	function backtrack(depth: number) {
		// Solution complète trouvée
		if (depth === 9) {
			const result = calculateResult(...(current as SolutionTuple));
			const status: SolutionStatus =
				Math.abs(result - 66) < 1e-6 ? 'success' : 'fail';

			// Ajoute la solution si elle correspond au variant demandé
			if (
				variant === 'all' ||
				(variant === 'all-valid' && status === 'success') ||
				(variant === 'all-invalid' && status === 'fail')
			) {
				results.push({
					id: generateId(),
					solution: [...(current as SolutionTuple)],
					status,
				});
			}
			return;
		}

		// Essaie chaque chiffre disponible
		for (const digit of digits) {
			if (used.has(digit)) continue;

			current[depth] = digit;
			used.add(digit);

			backtrack(depth + 1);
			used.delete(digit);
		}
	}

	// Lance l'algorithme de backtracking
	backtrack(0);

	const end = performance.now();
	return {
		solutions: results,
		duration: formatDuration(end - start),
	};
}

/**
 * Vérifie si une solution a changé
 *
 * @param current - Solution actuelle
 * @param previous - Solution précédente
 * @returns true si la solution a changé, false sinon
 */
export function hasSolutionChanged(
	current: (number | null)[],
	previous: (number | null)[],
): boolean {
	if (current.length !== previous.length) return true;

	return current.some((value, index) => value !== previous[index]);
}

/**
 * Crée un stockage personnalisé avec une gestion de quota
 *
 * @returns Un objet contenant les méthodes getItem, setItem et removeItem
 */
export const createCustomStorage = () => {
	// Crée un stockage personnalisé avec une gestion de quota
	const storage = Platform.OS === 'web' ? window.localStorage : AsyncStorage;

	// Retourne un objet contenant les méthodes getItem, setItem et removeItem
	return {
		// Récupère une valeur
		getItem: async (name: string): Promise<string | null> => {
			try {
				const value = await storage.getItem(name);
				return value;
			} catch (error) {
				console.error('Error getting item from storage:', error);
				return null;
			}
		},
		// Enregistre une valeur
		setItem: async (name: string, value: string): Promise<void> => {
			try {
				// For web, check if we're exceeding quota
				if (Platform.OS === 'web') {
					try {
						// Try to store a small test value first
						const testKey = `test-${Date.now()}`;
						storage.setItem(testKey, 'test');
						storage.removeItem(testKey);

						// If successful, store the actual value
						storage.setItem(name, value);
					} catch (error: unknown) {
						const err = error as Error;
						if (
							err.name === 'QuotaExceededError' ||
							err.message?.includes('quota')
						) {
							console.warn(
								'Storage quota exceeded, implementing fallback strategy',
							);

							// Parse the value to get the solutions array
							const data = JSON.parse(value);
							if (data && data.state && data.state.solutions) {
								// Keep only the most recent 50 solutions
								const limitedSolutions = data.state.solutions.slice(-50);
								data.state.solutions = limitedSolutions;

								// Try storing the limited data
								storage.setItem(name, JSON.stringify(data));
								return;
							}
						}
						throw error;
					}
				} else {
					// For React Native, just store normally
					await storage.setItem(name, value);
				}
			} catch (error) {
				console.error('Error setting item in storage:', error);
			}
		},
		removeItem: async (name: string): Promise<void> => {
			try {
				await storage.removeItem(name);
			} catch (error) {
				console.error('Error removing item from storage:', error);
			}
		},
	};
};
