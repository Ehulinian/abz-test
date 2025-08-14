import { Button } from '../UI/Button';
import styles from './Hero.module.scss';

export const Hero = () => {
	return (
		<section className={styles.hero}>
			<div className={styles.content}>
				<h1>Test assignment for front-end developer</h1>
				<p>
					What defines a good front-end developer is one that has skilled
					knowledge of HTML, CSS, JS with a vast understanding of User design
					thinking as they'll be building web interfaces with accessibility in
					mind. They should also be excited to learn, as the world of Front-End
					Development keeps evolving.
				</p>
				<a href="#signup">
					<Button>Sign up</Button>
				</a>
			</div>
		</section>
	);
};
