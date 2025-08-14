import { UsersList } from '../UsersList';
import styles from './userSection.module.scss';
import { Button } from '../UI/Button';
import { UsersSkeleton } from '../UsersSkeleton';
import type { User } from '../../types/api/User';

type Props = {
	users: User[];
	showMore: () => void;
	nextUrl: string | null;
	isLoading: boolean;
};

export const UsersSection: React.FC<Props> = ({
	users,
	showMore,
	isLoading,
	nextUrl,
}) => {
	return (
		<section id="users" className={styles.userSection}>
			<h1>Working with GET request</h1>

			{isLoading && users.length === 0 ? (
				<UsersSkeleton count={6} />
			) : (
				<>
					<UsersList users={users} />
					{isLoading && <UsersSkeleton count={6} />}
				</>
			)}

			{!isLoading && nextUrl && (
				<Button variant="wide" onClick={showMore}>
					show more
				</Button>
			)}
		</section>
	);
};
