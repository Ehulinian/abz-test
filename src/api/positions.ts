import type { GetPositionsResponse } from '../types/api/Position';
import { client } from '../utils/httpClient';

export const getPositions = () => {
	return client.get<GetPositionsResponse>(
		'https://frontend-test-assignment-api.abz.agency/api/v1/positions'
	);
};
