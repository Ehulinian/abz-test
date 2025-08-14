import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { UserForm } from './components/UserForm';
import { UsersSection } from './components/UsersSection';
import './App.scss';
import { useEffect, useState } from 'react';
import type { User } from './types/api/User';
import * as userService from './api/users';
import type { Position } from './types/api/Position';
import * as positionService from './api/positions';

function App() {
	const [users, setUsers] = useState<User[]>([]);
	const [nextUrl, setNextUrl] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState(false);
	const [isPositionLoading, setIsPositionLoading] = useState(false);
	const [positions, setPositions] = useState<Position[]>([]);

	const loadUsers = (nextPageUrl?: string) => {
		setIsLoading(true);
		userService
			.getUsers(1, 6, nextPageUrl)
			.then(response => {
				if (nextPageUrl) {
					setUsers(prev => [...prev, ...response.users]);
				} else {
					setUsers(response.users);
				}
				setNextUrl(response.links.next_url);
			})
			.catch(console.error)
			.finally(() => setIsLoading(false));
	};

	const loadPositions = () => {
		setIsPositionLoading(true);
		positionService
			.getPositions()
			.then(res => setPositions(res.positions))
			.catch(e => {
				throw new Error(e);
			})
			.finally(() => setIsPositionLoading(false));
	};

	useEffect(() => {
		loadUsers();
		loadPositions();
	}, []);

	const handleShowMore = () => {
		if (nextUrl) {
			loadUsers(nextUrl);
		}
	};

	return (
		<>
			<Header />
			<main className="main">
				<Hero />
				<UsersSection
					users={users}
					showMore={handleShowMore}
					isLoading={isLoading}
					nextUrl={nextUrl}
				/>
				<UserForm
					positions={positions}
					isPositionLoading={isPositionLoading}
					onSuccess={() => loadUsers()}
				/>
			</main>
		</>
	);
}

export default App;
