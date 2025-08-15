import React, { useState, useRef, useEffect } from 'react';
import type { User } from '../../types/api/User';
import styles from './UserCard.module.scss';
import { Preloader } from '../UI/Preloader';
import { Tooltip } from 'react-tooltip';

type Props = {
	user: User;
};

export const UserCard: React.FC<Props> = ({ user }) => {
	const [isImageLoading, setIsImageLoading] = useState(true);
	const [isNameTruncated, setIsNameTruncated] = useState(false);
	const [isPositionTruncated, setIsPositionTruncated] = useState(false);
	const [isEmailTruncated, setIsEmailTruncated] = useState(false);

	const nameRef = useRef<HTMLSpanElement>(null);
	const positionRef = useRef<HTMLSpanElement>(null);
	const emailRef = useRef<HTMLSpanElement>(null);

	const nameTooltipId = `name-tooltip-${user.id}`;
	const positionTooltipId = `position-tooltip-${user.id}`;
	const emailTooltipId = `email-tooltip-${user.id}`;

	useEffect(() => {
		const checkTruncation = (
			ref: React.RefObject<HTMLSpanElement | null>,
			setTruncated: (value: boolean) => void
		) => {
			if (ref.current) {
				const { scrollWidth, clientWidth } = ref.current;
				setTruncated(scrollWidth > clientWidth);
			}
		};

		checkTruncation(nameRef, setIsNameTruncated);
		checkTruncation(positionRef, setIsPositionTruncated);
		checkTruncation(emailRef, setIsEmailTruncated);
	}, [user]);

	return (
		<div className={styles.userCard}>
			<div className={styles.content}>
				{isImageLoading && <Preloader type="normal" />}
				<img
					src={user.photo}
					alt={user.name}
					className={styles.avatar}
					style={{ display: isImageLoading ? 'none' : 'block' }}
					onLoad={() => setIsImageLoading(false)}
					onError={() => setIsImageLoading(false)}
				/>

				<div className={styles.userInformation}>
					<span
						ref={nameRef}
						className={styles.name}
						data-tooltip-id={isNameTruncated ? nameTooltipId : undefined}
						style={{ cursor: isNameTruncated ? 'pointer' : '' }}
					>
						{user.name}
					</span>
					{isNameTruncated && (
						<Tooltip
							id={nameTooltipId}
							content={user.name}
							className={styles.customTooltip}
							place="bottom"
						/>
					)}
					<span
						ref={positionRef}
						className={styles.name}
						data-tooltip-id={
							isPositionTruncated ? positionTooltipId : undefined
						}
						style={{ cursor: isPositionTruncated ? 'pointer' : '' }}
					>
						{user.position}
					</span>
					{isPositionTruncated && (
						<Tooltip
							id={positionTooltipId}
							content={user.position}
							className={styles.customTooltip}
							place="bottom"
						/>
					)}
					<span
						ref={emailRef}
						className={styles.name}
						data-tooltip-id={isEmailTruncated ? emailTooltipId : undefined}
						style={{ cursor: isEmailTruncated ? 'pointer' : '' }}
					>
						{user.email}
					</span>
					{isEmailTruncated && (
						<Tooltip
							id={emailTooltipId}
							content={user.email}
							className={styles.customTooltip}
							place="bottom"
							offset={8}
						/>
					)}
					<p className={styles.phone}>{user.phone}</p>
				</div>
			</div>
		</div>
	);
};
