import type { ReactNode } from 'react';
import styles from './Button.module.scss';

type Props = {
	children: ReactNode;
	disabled?: boolean;
	onClick?: () => void;
	variant?: 'normal' | 'wide';
};

export const Button: React.FC<Props> = ({
	onClick,
	children,
	disabled,
	variant,
}) => {
	return (
		<button
			onClick={onClick}
			className={`${styles.btn} ${variant === 'wide' ? styles.wide : ''}`}
			disabled={disabled}
		>
			{children}
		</button>
	);
};
