import React from 'react';

import packageJson from '../package.json';

import { Wallpaper } from './styles';

function NotFound() {
	return <>
		<div className='Wallpaper' style={Wallpaper} />

		<div className='wallapper acrylic form shadow' style={{ textAlign: 'left' }}>
			<div style={{ animation: '0.8s ease 0s 1 normal none running SettingsOptions' }}>
				<div className='glitch' data-text='404' style={{ textAlign: 'left' }}>404</div>
				<h3>Not Found</h3>
				<p>
					Malheureusement, la page que vous demandez n’existe pas ou plus.<br />
					Vérifiez l’url saisie et si besoin, contactez l’administration.
				</p>
				<br />
				<a className='link' href='https://beta.hackernwar.com/'>Retour à l’index</a>
				<br /><br />
				<a className='link' href='#' onClick='goBack()'>Page précedente</a>
			</div>
		</div>
		<div className='wallapper acrylic form shadow' style={{ textAlign: 'left' }}>
			<div style={{ animation: '0.8s ease 0s 1 normal none running SettingsOptions' }}>
				<br />
				<img className='logo' src='https://beta.hackernwar.com/assets/img/default/Logo.png' style={{ height: '50px' }} />
				<br />
				<span>
					MyLines 2021 - {new Date().getFullYear()} • Version {packageJson.mainVersion}-{packageJson.version}
					<br />
					Made with 💖 / In Tartiflette we trust
				</span>
				<br />
				<a className='mini_fluent_btn' href='http://discord.beta.hackernwar.com'> <img className='svg' src='https://beta.hackernwar.com/assets/img/discord.svg' style={{ width: '25px' }} /> </a>
				<a className='mini_fluent_btn' href='mailto:clementf78@gmail.com'> <img className='svg' src='https://beta.hackernwar.com/assets/img/mail.svg' style={{ width: '25px' }} /> </a>
				<br /><br />
				<h3 style={{ display: 'block' }}>Besoin d’aide ?</h3>
				<a className='link' href='https://mylines.betteruptime.com/'> Status </a> <br />
				<a className='link' href='http://discord.beta.hackernwar.com'> Demander à la communauté </a> <br />
			</div>
		</div>
	</>;
}

export default NotFound;