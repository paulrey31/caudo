const API_URL = 'http://localhost:8080/';

export const getSolutions = async () => {
	const res = await fetch(API_URL);
	return res.json();
};

export const postSolution = async (solution: {
	id: string;
	solution: number[];
	status: string;
}) => {
	const res = await fetch(API_URL, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(solution),
	});
	return res.json();
};

export const deleteSolution = async (id: string) => {
	await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
};

export const deleteAllSolutions = async () => {
	await fetch(API_URL, { method: 'DELETE' });
};
