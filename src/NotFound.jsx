import React from 'react';

import logo from './assets/img/Logo.png';

function NotFound() {
	return <div className='error'>
		<div className='home'>
			<img src={logo} className='logo' alt='Logo MyLines Embed' />
		</div>
	</div>;
}

export default NotFound;