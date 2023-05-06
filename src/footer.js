import React from 'react';

import './assets/css/main.css';
import logo from './assets/img/Logo.png';
import github from './assets/img/github.svg';
import discord from './assets/img/discord.svg';
import mail from './assets/img/mail.svg';


class Footer extends React.Component {
	render() {
		return <div className='footer'>
			<div className='footer-flex'>

				<div className='column'>
					<img src={logo} className='logo'></img>
					<br />
					<span>
                        MyLines 2021 - {new Date().getFullYear()}
						<br />
                        Made with 💖
					</span>
					<br />
					<a href='https://github.com/MaisClement/MyLinesEmbed' className='mini_fluent_btn'> <img src={github} alt='github' /> </a>
					<a href='http://discord.mylines.fr' className='mini_fluent_btn'> <img src={discord} alt='discord' /> </a>
					<a href='mailto:admin@mylines.fr' className='mini_fluent_btn'> <img src={mail} alt='mail' /> </a>
				</div>

				<div className='column'>
					<h3 >Besoin d’aide ?</h3>

					<a href='https://mylines.betteruptime.com/' className='linkblue'> Status </a> <br />
					<a href='http://mylines.fr/help' className='linkblue'> Questions fréquentes </a> <br />
					<a href='http://discord.mylines.fr' className='linkblue'> Demander à la communauté </a> <br />
					<a href='http://mylines.fr/embed/doc' className='linkblue'> Documentation MyLines Embed </a> <br />
				</div>

				<div className='column'>
					<h3 >Remerciements</h3>

                    thithis#1523    <br />
                    Tibo#4872       <br />
                    Auguste#1143
				</div>

				<div className='column'>
					<h3 >À propos</h3>

					<a href='http://mylines.fr/cgu' className='linkblue'> Conditions générales </a> <br />
					<a href='https://icones8.fr/' target='_blank' className='linkblue' rel='noreferrer'> Icones par Icones8</a> <br />
					<a href='https://animista.net/' target='_blank' className='linkblue' rel='noreferrer'> Animations CSS par Animista </a> <br />
					<a href='https://train-empire.com/fr/' target='_blank' className='linkblue' rel='noreferrer'> Permis par Train-Empire </a>
				</div>
			</div>
			<br />
		</div>;
	}
}

export default Footer;