import type { User } from '../../types/api/User';
import { UserCard } from '../UserCard';
import styles from './UsersList.module.scss';

type Props = {
	users: User[];
};

export const UsersList: React.FC<Props> = ({ users }) => {
	return (
		<ul className={styles.usersContainer}>
			{users.map(user => (
				<UserCard user={user} key={user.id} />
			))}
		</ul>
	);
};
