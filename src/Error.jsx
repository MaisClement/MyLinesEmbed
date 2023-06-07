import React from 'react';

import packageJson from '../package.json';

import { Wallpaper } from './styles';

function NotFound() {
	return <>
		<div className='Wallpaper' style={Wallpaper} />

		<div className='wallapper acrylic form shadow' style={{ textAlign: 'left' }}>
			<div style={{ animation: '0.8s ease 0s 1 normal none running SettingsOptions' }}>
				<div className='glitch' data-text='Erreur' style={{ textAlign: 'left' }}>Erreur</div>
				<h3>Quelque chose s’est mal passé.</h3>
				<p>
					Une erreur interne s’est produite. Réessayez dans quelques minutes et si besoin, contactez l’administration.
				</p>
			</div>
		</div>
		<div className='wallapper acrylic form shadow' style={{ textAlign: 'left' }}>
			<div style={{ animation: '0.8s ease 0s 1 normal none running SettingsOptions' }}>
				<br />
				<img className='logo' src='https://mylines.fr/assets/img/default/Logo.png' style={{ height: '50px' }} />
				<br />
				<span>
					MyLines 2021 - {new Date().getFullYear()} • Version {packageJson.mainVersion}-{packageJson.version}
					<br />
					Made with 💖 / In Tartiflette we trust
				</span>
				<br />
				<a className='mini_btn' href='http://discord.mylines.fr'> <img className='svg' src='https://mylines.fr/assets/img/discord.svg' style={{ width: '25px' }} /> </a>
				<a className='mini_btn' href='mailto:clementf78@gmail.com'> <img className='svg' src='https://mylines.fr/assets/img/mail.svg' style={{ width: '25px' }} /> </a>
				<br /><br />
				<h3 style={{ display: 'block' }}>Besoin d’aide ?</h3>
				<a className='link' href='https://mylines.betteruptime.com/'> Status </a> <br />
				<a className='link' href='http://discord.mylines.fr'> Demander à la communauté </a> <br />
			</div>
		</div>
	</>;
}

export default NotFound;