import React from 'react';
import { useParams } from 'react-router-dom';

import logo from './assets/img/Logo.png';

import Gui from './gui';

function Home() {
	let params = useParams();
	return <div className='error'>
		<Gui
			style='SNCF'
			type='departure'
			display={true}
			opt='SNCF/departure'
			auth={params.auth}
		/>
		<div className='home'>
			<img src={logo} className='logo' alt='Logo MyLines Embed' />
		</div>
	</div>;
}

function Home_T() {
	return <div className='error'>
		<div className='home'>
			<img src={logo} className='logo' alt='Logo MyLines Embed' />
		</div>
	</div>;
}

export default Home;
export { Home_T };