import React from 'react';
import styles from './Input.module.scss';

interface TextInputProps {
	label?: string;
	type?: string;
	value: string;
	placeholder: string;
	onChange: (value: string) => void;
	onBlur?: () => void;
	errorMessage?: string;
	showHint: boolean;
	required?: boolean;
	className?: string;
	hint?: string;
}

export const TextInput: React.FC<TextInputProps> = ({
	label,
	type = 'text',
	value,
	hint,
	onChange,
	onBlur,
	showHint,
	errorMessage,
	required = false,
	placeholder,
	className = '',
}) => {
	return (
		<div className={styles.formInput}>
			{label && <label>{label}</label>}
			<input
				className={`${styles.input} ${
					errorMessage ? styles.inputError : ''
				} ${className}`}
				type={type}
				value={value}
				placeholder={placeholder}
				onChange={e => onChange(e.target.value)}
				onBlur={onBlur}
				required={required}
			/>
			{!errorMessage && hint && showHint && (
				<span className={styles.hint}>{hint}</span>
			)}
			{errorMessage && <span className={styles.error}>{errorMessage}</span>}
		</div>
	);
};
