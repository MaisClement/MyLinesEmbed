import React from 'react';

import logo from './assets/img/Logo.png';
import Gui from './components/GUI';

function NotFound({showGui}) {
	return <div className='error'>
		{
			showGui && <Gui
				style={'SNCF'}
				type={'departure'}
				stop={''}
				auth={''}
				forceOpen
				setError={() => {}}
			/>

		}
		<div className='home'>
			<img src={logo} className='logo' alt='Logo MyLines Embed' />
		</div>
	</div>;
}

export default NotFound;