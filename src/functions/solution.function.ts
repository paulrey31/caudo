export type Solution = [
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

export type SolutionType = {
	id: string;
	solution: Solution;
	status: 'success' | 'fail';
};

export type Variant = 'random' | 'all-valid' | 'all-invalid' | 'all';

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

function generateId(): string {
	return Math.random().toString(36).slice(2, 10);
}

function formatDuration(ms: number): string {
	const totalSeconds = ms / 1000;
	const minutes = Math.floor(totalSeconds / 60);
	const seconds = totalSeconds % 60;
	return `${minutes.toString().padStart(2, '0')}m${seconds.toFixed(3).padStart(6, '0')}s`;
}

/**
 * 🚀 Génère les solutions selon le mode `variant` choisi
 */
export function generateSolutionsSmart(variant: Variant): {
	solutions: SolutionType[];
	duration: string;
	durationMs: number;
} {
	const start = performance.now();
	const digits = [1, 2, 3, 4, 5, 6, 7, 8, 9];
	const used = new Set<number>();
	const results: SolutionType[] = [];

	// 🎲 Si le mode est "random", génère simplement une permutation aléatoire
	if (variant === 'random') {
		const shuffled = [...digits].sort(() => Math.random() - 0.5);
		const result = func(...(shuffled as Solution));
		const status = Math.abs(result - 66) < 1e-6 ? 'success' : 'fail';
		return {
			solutions: [
				{
					id: generateId(),
					solution: shuffled as Solution,
					status,
				},
			],
			duration: formatDuration(performance.now() - start),
			durationMs: performance.now() - start,
		};
	}

	const current: number[] = [];

	/**
	 * 🧠 Fonction récursive avec backtracking + élagage intelligent
	 */
	function backtrack(depth: number) {
		if (depth === 9) {
			const result = func(...(current as Solution));
			const status: 'success' | 'fail' =
				Math.abs(result - 66) < 1e-6 ? 'success' : 'fail';

			if (
				variant === 'all' ||
				(variant === 'all-valid' && status === 'success') ||
				(variant === 'all-invalid' && status === 'fail')
			) {
				results.push({
					id: generateId(),
					solution: [...(current as Solution)],
					status,
				});
			}
			return;
		}

		for (const digit of digits) {
			if (used.has(digit)) continue;

			current[depth] = digit;
			used.add(digit);

			// ⛔️ Élagage de cas invalides (division par zéro)
			if (depth === 2 && current[2] === 0) {
				used.delete(digit);
				continue;
			}
			if (depth === 8 && current[8] === 0) {
				used.delete(digit);
				continue;
			}

			backtrack(depth + 1);
			used.delete(digit);
		}
	}

	backtrack(0);

	const end = performance.now();
	return {
		solutions: results,
		duration: formatDuration(end - start),
		durationMs: end - start,
	};
}
