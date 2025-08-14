import styles from './Header.module.scss';
import logo from '../../assets/icons/Logo.svg';
import { Button } from '../UI/Button/Button';

export const Header = () => {
	return (
		<header className={styles.header}>
			<a href="/" className={styles.logoLink}>
				<img src={logo} alt="Logo" className={styles.logoImage} />
			</a>

			<div className={styles.buttons}>
				<a href="#users">
					<Button>Users</Button>
				</a>
				<a href="#signup">
					<Button>Sign up</Button>
				</a>
			</div>
		</header>
	);
};
