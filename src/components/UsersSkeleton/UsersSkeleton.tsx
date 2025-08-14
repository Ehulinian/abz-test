import styles from './UsersSkeleton.module.scss';

type Props = {
	count: number;
};

export const UsersSkeleton: React.FC<Props> = ({ count }) => {
	return (
		<ul className={styles.usersContainer}>
			{Array(count)
				.fill(0)
				.map((_, i) => (
					<li key={i} className={styles.userCardSkeleton}>
						<div className={styles.avatarSkeleton}></div>

						<div className={styles.nameSkeleton}></div>

						<div className={styles.contentSkeleton}>
							<div className={styles.positionSkeleton}></div>
							<div className={styles.emailSkeleton}></div>
							<div className={styles.phoneSkeleton}></div>
						</div>
					</li>
				))}
		</ul>
	);
};
