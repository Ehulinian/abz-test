import React, { useState } from 'react';
import type { User } from '../../types/api/User';
import styles from './UserCard.module.scss';
import { Preloader } from '../UI/Preloader';

type Props = {
	user: User;
};

export const UserCard: React.FC<Props> = ({ user }) => {
	const [isImageLoading, setIsImageLoading] = useState(true);

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

				<p className={styles.name}>{user.name}</p>

				<div className={styles.userInformation}>
					<p className={styles.position}>{user.position}</p>
					<p className={styles.email}>{user.email}</p>
					<p className={styles.phone}>{user.phone}</p>
				</div>
			</div>
		</div>
	);
};
