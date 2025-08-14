import type { Token } from '../types/api/Token';
import { client } from '../utils/httpClient';

export const getToken = () => {
	return client.post<Token>(
		'https://frontend-test-assignment-api.abz.agency/api/v1/token',
		{}
	);
};
