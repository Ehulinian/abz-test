// import { useState } from 'react';

// export function useFormState<T extends Record<string, any>>(initial: T) {
// 	const [values, setValues] = useState<T>(initial);
// 	const [touched, setTouched] = useState<Record<keyof T, boolean>>(
// 		Object.keys(initial).reduce((acc, key) => {
// 			acc[key as keyof T] = false;
// 			return acc;
// 		}, {} as Record<keyof T, boolean>)
// 	);

// 	const onChange = (field: keyof T, value: T[keyof T]) => {
// 		setValues(prev => ({ ...prev, [field]: value }));
// 	};

// 	const onBlur = (field: keyof T) => {
// 		setTouched(prev => ({ ...prev, [field]: true }));
// 	};

// 	return { values, touched, onChange, onBlur, setTouched, setValues };
// }
