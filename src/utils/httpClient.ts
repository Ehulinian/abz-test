/* eslint-disable @typescript-eslint/no-explicit-any */
const BASE_URL = '';

export function wait(delay: number) {
	return new Promise(resolve => setTimeout(resolve, delay));
}

type RequestMethod = 'GET' | 'POST';

function request<T>(
	url: string,
	method: RequestMethod = 'GET',
	data: any = null,
	headers: Record<string, string> = {}
): Promise<T> {
	const defaultHeaders: Record<string, string> = { ...headers };

	const options: RequestInit = {
		method,
		headers: defaultHeaders,
	};

	if (data) {
		if (data instanceof FormData) {
			options.body = data;

			if ('Content-Type' in defaultHeaders) {
				delete defaultHeaders['Content-Type'];
			}
		} else {
			options.body = JSON.stringify(data);
			defaultHeaders['Content-Type'] = 'application/json; charset=UTF-8';
			options.headers = defaultHeaders;
		}
	}

	return wait(1000)
		.then(() => fetch(BASE_URL + url, options))
		.then(async response => {
			const data = await response.json();

			if (data.success === false) {
				const error: any = new Error(data.message || 'Server error');
				error.response = data;
				error.status = response.status;
				throw error;
			}

			return data;
		});
}

export const client = {
	get: <T>(url: string) => request<T>(url),
	post: <T>(url: string, data: any, headers?: Record<string, string>) =>
		request<T>(url, 'POST', data, headers),
};
