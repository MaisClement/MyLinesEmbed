
import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Error from './Error';
import NotFound from './NotFound';
import Auth from './Auth';
import Gui from './components/GUI';

import { routes } from './routes';

function App() {
	const [isTe] = useState(window.location.host == 'mylines.fr');
	const [error, setError] = useState(null);
	const [isLoaded, setIsLoaded] = useState(false);
	const [trains, setTrains] = useState(null);

	const [style, setStyle] = useState('SNCF');
	const [type, setType] = useState('departure');
	const [stop, setStop] = useState(null);
	const [auth, setAuth] = useState(null);

	React.useEffect(() => {
		if (type && stop) {
			getData();
		}

		let delay = 50;
		if (typeof getUrlVars()['update'] !== 'undefined') {
			delay = getUrlVars()['update'];
		}

		if (delay < 10)
			delay = 50;

		const interval = setInterval(async () => {
			await getData();
		}, delay * 1000);

		return () => clearInterval(interval);
	}, [type, stop, auth]);

	const getData = async () => {
		try {
			if (stop == null) {
				return ;
			}

			const count = 7;

			const url = isTe
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
			<Route path='/embed'>
				<Route path='/embed/:auth' element={ <Auth setAuth={setAuth} /> } />
				{renderRoutes(routes)}
			</Route>
			{renderRoutes(routes)}
			
			<Route index element={
				<NotFound
					showGui={isTe == false}
				/>
			} />
			
			<Route path='*' element={
				<NotFound
					showGui={isTe == false}
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

function getUrlVars() {
	var vars = {};
	window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (m, key, value) {
		vars[key] = value;
	});
	return vars;
}

export default App;
