import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import logo from './assets/img/Logo.png';
import Gui from './components/GUI';

const Auth = ({ setAuth }) => {
	let { auth } = useParams();

	useEffect(() => {
		setAuth(auth);
	}, []);

	return <div className='error'>
		{
			<Gui
				style={''}
				type={''}
				stop={''}
				auth={auth}
				forceOpen
				setError={() => {}}
			/>

		}
		<div className='home'>
			<img src={logo} className='logo' alt='Logo MyLines Embed' />
		</div>
	</div>;
};

export default Auth;