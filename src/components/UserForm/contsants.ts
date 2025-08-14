/* eslint-disable @typescript-eslint/no-explicit-any */
import type { RegisterUserData } from '../../types/api/User';

export const validationRules: Record<
	keyof RegisterUserData,
	(value: any) => string | undefined
> = {
	name: v =>
		!v
			? 'Name is required'
			: v.length < 2
			? 'Username should contain 2-60 characters.'
			: undefined,
	email: v =>
		!v
			? 'Email is required'
			: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)
			? undefined
			: 'Email must be valid',
	phone: v =>
		!v
			? 'Phone is required'
			: /^\+380\d{9}$/.test(v)
			? undefined
			: 'Number should start with code of Ukraine +380 and 9 digits.',
	position_id: v => (!v ? 'Position is required' : undefined),
	photo: file => {
		if (!file) return 'Photo is required';

		if (!['image/jpeg', 'image/jpg'].includes(file.type))
			return 'Photo must be jpeg/jpg type';

		if (file.size > 5 * 1024 * 1024)
			return 'Photo size must not be greater than 5 Mb';

		return undefined;
	},
};
