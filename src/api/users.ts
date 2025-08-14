import type {
	GetUsersResponse,
	RegisterUserData,
	ResponseErrorRegister,
	ResponseUserRegister,
} from '../types/api/User';
import { client } from '../utils/httpClient';

export const getUsers = (page: number, count: number, nextUrl?: string) => {
	if (nextUrl) {
		return client.get<GetUsersResponse>(nextUrl);
	} else {
		return client.get<GetUsersResponse>(
			`https://frontend-test-assignment-api.abz.agency/api/v1/users?page=${page}&count=${count}`
		);
	}
};

export const createUser = (
	{ name, email, phone, position_id, photo }: RegisterUserData,
	token: string
): Promise<ResponseUserRegister | ResponseErrorRegister> => {
	const formData = new FormData();

	formData.append('name', name);
	formData.append('email', email);
	formData.append('phone', phone);
	formData.append('position_id', String(position_id));
	if (photo) {
		formData.append('photo', photo);
	}

	return client.post(
		'https://frontend-test-assignment-api.abz.agency/api/v1/users',
		formData,
		{
			Token: token,
		}
	);
};
