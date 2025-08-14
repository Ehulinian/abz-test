export interface Link {
	next_url: string;
	prev_url: null;
}

export interface User {
	id: number;
	name: string;
	email: string;
	phone: string;
	position: string;
	position_id: number;
	registration_timestamp: number;
	photo: File | string;
}

export type GetUsersResponse = {
	success: boolean;
	page: number;
	total_pages: number;
	total_users: number;
	count: number;
	links: Link;
	users: User[];
};

export interface RegisterUserData {
	name: string;
	email: string;
	phone: string;
	position_id: number | null;
	photo: File | null;
}

export interface ResponseUserRegister {
	message: string;
	success: boolean;
	user_id: number;
}

export type Fails = Record<
	'name' | 'email' | 'phone' | 'position_id' | 'photo',
	string[]
>;

export interface ResponseErrorRegister {
	success: boolean;
	message: string;
	fails: Fails;
}
