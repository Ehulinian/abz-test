import React, { useRef, useState } from 'react';
import styles from './FileInput.module.scss';

interface FileInputProps {
	onChange: (file: File | null) => void;
	onBlur?: () => void;
	errorMessage: string | undefined;
	required?: boolean;
	placeholder?: string;
	className?: string;
}

export const FileInput: React.FC<FileInputProps> = ({
	onChange,
	onBlur,
	required = false,
	errorMessage,
	placeholder = 'Upload your photo',
	className,
}) => {
	const inputRef = useRef<HTMLInputElement>(null);
	const [fileName, setFileName] = useState('');

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files?.[0]) {
			setFileName(e.target.files[0].name);
			onChange(e.target.files[0]);
		} else {
			setFileName('');
			onChange(null);
		}
	};

	const handleClick = () => {
		inputRef.current?.click();
	};

	return (
		<div
			className={`${styles.fileInputWrapper} ${className}`}
			onClick={handleClick}
			role="button"
			tabIndex={0}
			onKeyDown={e => {
				if (e.key === 'Enter' || e.key === ' ') {
					e.preventDefault();
					handleClick();
				}
			}}
		>
			<div className={`${styles.fileName} ${errorMessage ? styles.error : ''}`}>
				{fileName || placeholder}
			</div>
			<button
				type="button"
				className={`${styles.uploadButton} ${
					errorMessage ? styles.errorBtn : ''
				}`}
				onClick={e => {
					e.stopPropagation();
					handleClick();
				}}
			>
				Upload
			</button>
			<input
				ref={inputRef}
				type="file"
				accept="image/*"
				onChange={handleFileChange}
				onBlur={onBlur}
				required={required}
				style={{ display: 'none' }}
			/>
			{errorMessage && <span className={styles.errorText}>{errorMessage}</span>}
		</div>
	);
};
