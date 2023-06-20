
import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Error from './Error';
import NotFound from './NotFound';
import Auth from './Auth';
import Gui from './components/GUI';

import { routes } from './routes';

function App() {
	const isTe = true; // window.location.host == 'mylines.fr';
	const [error, setError] = useState(null);
	const [isLoaded, setIsLoaded] = useState(false);
	const [trains, setTrains] = useState(null);

	const [style, setStyle] = useState(null);
	const [type, setType] = useState(null);
	const [stop, setStop] = useState(null);
	const [auth, setAuth] = useState(null);

	React.useEffect(() => {
		if (type && stop) {
			getData();
		}
	}, [type, stop, auth]);

	const getData = async () => {
		try {
			const count = 7;

			const url = auth
				? `https://api.mylines.fr/te/${type}?stop=${stop}&auth=${auth}&count=${count}`
				: `https://api.mylines.fr/sncf/${type}?stop=${stop}&count=${count}`;

			const res = await fetch(url, {
				method: 'get',
			});

			if (res.status === 200) {
				const response = await res.json();
				console.log(response.trains);
				setTrains(response.trains);
				setIsLoaded(true);
			} else {
				setIsLoaded(true);
				// ERREUR
				// ERREUR
			}
		} catch (error) {
			setError('Récupération des informations impossible.');
			console.log(error);
			setIsLoaded(true);
			// ERREUR
		}
	};

	const makePath = (url) => {
		if (isTe) {
			return `${url}/:type/:stop/:auth`;
		}
		return `${url}/:type/:stop`;
	};

	const renderRoutes = (routes) =>
		routes.map((route, index) => {
			return <Route
				element={
					<route.component
						trains={trains}
						isLoaded={isLoaded}
						setType={setType}
						setStop={setStop}
						setAuth={setAuth}
						setStyle={setStyle}
					/>}
				exact={route.exact}
				key={index}
				path={makePath(route.id)}
			/>;
		});

	if (error) {
		return <Error />;
	}

	return <BrowserRouter>
		<Routes>

			<Route path='/'>
				<Route path='/:auth' element={ <Auth setAuth={setAuth} /> } />
				{renderRoutes(routes)}
			</Route>
			{renderRoutes(routes)}
			
			<Route index element={
				<NotFound
					showGui={isTe == false || isTe && auth}
				/>
			} />
			<Route path='*' element={
				<NotFound
					showGui={isTe == false || isTe && auth}
				/>
			} />

		</Routes>
		<div className='hover' />
		{
			window.location.href.indexOf('?gui') !== -1
			&& <Gui
				style={style}
				type={type}
				stop={stop}
				auth={auth}
				setError={setError}
			/>
		}
	</BrowserRouter >;
}

export default App;
