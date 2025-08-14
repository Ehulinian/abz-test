/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { TextInput } from '../UI/Input';
import { FileInput } from '../UI/FileInput';
import styles from './UserForm.module.scss';
import { getToken } from '../../api/token';
import successImage from '../../assets/images/success-image.svg';
import * as postService from '../../api/users';
import type { Position } from '../../types/api/Position';
import type { RegisterUserData } from '../../types/api/User';
import { validationRules } from './contsants';
import type { Errors, Touched } from '../../types/api/Errors';

type Props = {
	positions: Position[];
	isPositionLoading: boolean;
	onSuccess?: () => void;
};

export const UserForm: React.FC<Props> = ({
	positions,
	isPositionLoading,
	onSuccess,
}) => {
	const [form, setForm] = useState<RegisterUserData>({
		name: '',
		email: '',
		phone: '',
		position_id: null,
		photo: null,
	});

	const [errors, setErrors] = useState<Errors>({});
	const [touched, setTouched] = useState<Touched>({});
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [isSuccess, setIsSuccess] = useState(false);

	const isFormValid =
		!validationRules.name(form.name) &&
		!validationRules.email(form.email) &&
		!validationRules.phone(form.phone) &&
		!validationRules.position_id(form.position_id) &&
		!validationRules.photo(form.photo);

	const disableButton = isSubmitting || !isFormValid;

	const isFieldInvalid = (field: keyof typeof form) => !!errors[field];

	const updateField = (
		field: keyof RegisterUserData,
		value: any,
		markTouched = false
	) => {
		setForm(prev => ({ ...prev, [field]: value }));

		if (markTouched) {
			setTouched(prev => ({ ...prev, [field]: true }));
		}

		if (touched[field] || markTouched) {
			setErrors(prev => ({ ...prev, [field]: validationRules[field](value) }));
		}
	};

	const handleChange = (field: keyof RegisterUserData, value: any) => {
		updateField(field, value);
	};

	const handleBlur = (field: keyof RegisterUserData) => {
		updateField(field, form[field], true);
	};

	const validateAll = () => {
		const newErrors: Errors = {};
		(Object.keys(form) as (keyof RegisterUserData)[]).forEach(f => {
			newErrors[f] = validationRules[f](form[f]);
		});
		setErrors(newErrors);
		return newErrors;
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsSubmitting(true);

		setTouched(
			Object.keys(form).reduce((acc, f) => ({ ...acc, [f]: true }), {})
		);

		const newErrors = validateAll();
		if (Object.values(newErrors).some(Boolean)) {
			setIsSubmitting(false);
			return;
		}

		try {
			const token = (await getToken()).token;
			const response = await postService.createUser(form, token);

			if (response.success) {
				setIsSuccess(true);
				setForm({
					name: '',
					email: '',
					phone: '',
					position_id: null,
					photo: null,
				});
				setTouched({});
				setErrors({});
				if (onSuccess) onSuccess();
			}
		} catch (err: any) {
			if (err.response) {
				if (err.response.fails) {
					const newErrors: Errors = {};
					Object.keys(err.response.fails).forEach(field => {
						newErrors[field as keyof Errors] = err.response.fails[field][0];
					});
					setErrors(newErrors);
				} else {
					const serverMsg = err.response.message;
					setErrors(prev => ({
						...prev,
						email: serverMsg,
						phone: serverMsg,
					}));
				}
			}
		} finally {
			setIsSubmitting(false);
		}
	};

	const textInputs: {
		name: keyof typeof form;
		placeholder: string;
		type?: string;
		hint?: string;
	}[] = [
		{ name: 'name', placeholder: 'Your Name' },
		{ name: 'email', placeholder: 'Email', type: 'email' },
		{
			name: 'phone',
			placeholder: 'Phone',
			type: 'tel',
			hint: '+38 (XXX) XXX - XX - XX',
		},
	];

	if (isSuccess) {
		return (
			<section className={styles.container}>
				<h1>User successfully registered</h1>
				<img src={successImage} alt="Success" />
			</section>
		);
	}

	return (
		<section id="signup" className={styles.container}>
			<h1>Working with POST request</h1>

			<form onSubmit={handleSubmit} className={styles.form}>
				<div className={styles.textInputs}>
					{textInputs.map(input => (
						<TextInput
							key={input.name}
							placeholder={input.placeholder}
							type={input.type}
							hint={input.hint}
							showHint={isFieldInvalid(input.name)}
							value={(form[input.name] || '') as string}
							onChange={val => handleChange(input.name, val)}
							onBlur={() => handleBlur(input.name)}
							errorMessage={errors[input.name]}
						/>
					))}
				</div>

				{!isPositionLoading && (
					<div className={styles.positions}>
						<legend className={styles.legend}>Select your position</legend>
						<div
							className={`${styles.positionList} ${
								touched.position_id && errors.position_id
									? styles.inputError
									: ''
							}`}
						>
							{positions.map(pos => (
								<label key={pos.id} className={styles.customRadioContainer}>
									<input
										type="radio"
										name="position"
										value={pos.id}
										className={styles.hiddenRadioInput}
										checked={form.position_id === pos.id}
										onChange={() => handleChange('position_id', pos.id)}
										onBlur={() => handleBlur('position_id')}
									/>
									<span className={styles.customRadioCircle}></span>
									{pos.name}
								</label>
							))}
						</div>
						{touched.position_id && errors.position_id && (
							<div className={styles.errorMsg}>{errors.position_id}</div>
						)}
					</div>
				)}

				<FileInput
					onChange={file => handleChange('photo', file)}
					onBlur={() => handleBlur('photo')}
					errorMessage={
						touched.photo && errors.photo ? errors.photo : undefined
					}
				/>

				<button
					type="submit"
					disabled={disableButton}
					className={styles.formBtn}
				>
					Sign up
				</button>
			</form>
		</section>
	);
};
