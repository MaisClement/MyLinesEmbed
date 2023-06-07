/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Error from './Error';
import NotFound from './NotFound';

import { routes } from './routes';

function App() {
	const isTe = false;
	const [error, setError] = useState(null);
	const [trains, setTrains] = useState(null);
	
	const [type, setType] = useState(null);
	const [stop, setStop] = useState(null);
	const [auth, setAuth] = useState(null);

	const base_url = 'https://mylines.fr/account';
	// base url egalement defini dans d'autre fichier !

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
			} else {
				// ERREUR
				// ERREUR
			}
		} catch (error) {
			setError('Récupération des informations impossible.');
			console.log(error);
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
						setType={setType}
						setStop={setStop}
						setAuth={setAuth}
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
				{renderRoutes(routes)}
			</Route>
			{renderRoutes(routes)}
			<Route element={<NotFound />} path='*' />

		</Routes>
	</BrowserRouter >;
}

export default App;
