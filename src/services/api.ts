import { SolutionType } from '../types/solution.type';

const API_URL = 'http://192.168.1.107:8080/solutions';

export const getSolutions = async () => {
	const res = await fetch(API_URL);
	return res.json();
};

export const postSolution = async (solution: SolutionType) => {
	const res = await fetch(API_URL, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(solution),
	});

	return res.json();
};

export const postBulkSolutions = async (solutions: SolutionType[]) => {
	await fetch(`${API_URL}/bulk`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(solutions),
	});
};

export const deleteSolution = async (id: string) => {
	await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
};

export const deleteAllSolutions = async () => {
	await fetch(API_URL, { method: 'DELETE' });
};
export async function updateSolution(
	id: string,
	updatedData: {
		solution: number[];
		status: string;
	},
) {
	try {
		const response = await fetch(`${API_URL}/${id}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(updatedData),
		});

		if (!response.ok) {
			const errorText = await response.text();
			throw new Error(`Erreur serveur : ${response.status} ${errorText}`);
		}

		const data = await response.json();
		return data;
	} catch (err) {
		console.error('Erreur lors de la mise à jour de la solution :', err);
		throw err;
	}
}
