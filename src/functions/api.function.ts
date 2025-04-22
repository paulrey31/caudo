import { postBulkSolutions } from '../services/api';
import { SolutionType } from '../types/solution.type';

export const chunkArray = <T>(array: T[], size: number): T[][] =>
	Array.from({ length: Math.ceil(array.length / size) }, (_, i) =>
		array.slice(i * size, i * size + size),
	);

export const uploadSolutionsInBatches = async (
	allSolutions: SolutionType[],
	batchSize: number = 10000,
) => {
	const batches = chunkArray(allSolutions, batchSize);
	const totalBatches = batches.length;

	for (let i = 0; i < totalBatches; i++) {
		const batch = batches[i];
		try {
			await postBulkSolutions(batch);
		} catch (err) {
			console.error(
				`Erreur lors de l'envoi du batch ${i + 1}/${totalBatches}`,
				err,
			);
			// Tu peux décider ici de continuer ou d'arrêter
			throw err;
		}
		// Optionnel : attendre un peu entre les batchs
		await new Promise((resolve) => setTimeout(resolve, 200));
	}

	console.log('✅ Envoi terminé !');
};
