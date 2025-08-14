export type Errors = Partial<
	Record<'name' | 'email' | 'phone' | 'position_id' | 'photo', string>
>;
export type Touched = Partial<Record<keyof Errors, boolean>>;
