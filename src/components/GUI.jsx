import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import logo from '../assets/img/Logo.png';
import packageJson from '../../package.json';
import '../assets/css/TALOS.css';

import github from '../assets/img/github.svg';
import discord from '../assets/img/discord.svg';
import mail from '../assets/img/mail.svg';
import del from '../assets/img/delete.svg';

// eslint-disable-next-line no-unused-vars
const GUI = ({ auth, type, style, forceOpen, setError}) => {

	const [isOpened, setIsOpened] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [value, setValue] = useState('');
	// eslint-disable-next-line no-unused-vars
	const [stops, setStops] = useState(null);

	// eslint-disable-next-line no-unused-vars
	const [selectedType, setType] = useState(type);
	// eslint-disable-next-line no-unused-vars
	const [selectedStyle, setStyle] = useState(style);

	function handleToogleOpen() {
		setIsOpened(isOpened => !isOpened);
	}

	async function handleOnChange(event) {
		setValue(event.currentTarget.value);
		await getStops();
	}

	const getStops = async () => {
		try {
			const url = auth
				? `https://api.mylines.fr/te/search?q=${value}&auth=${auth}`
				: `https://api.mylines.fr/sncf/search?q=${value}`;

			const res = await fetch(url, {
				method: 'get',
			});

			setIsLoading(true);

			if (res.status === 200) {
				const response = await res.json();
				setStops(response.stop_points);
				console.log(response.stop_points);
			} else {
				// ERREUR
				// ERREUR
			}
			setIsLoading(false);
		} catch (error) {
			setError('Récupération des informations impossible.');
			console.log(error);
			setIsLoading(false);
			// ERREUR
		}
	};

	if (isOpened || forceOpen) {
		return <>
			<div className='gui-show' onClick={handleToogleOpen} >
				<span className='bigger'> Options disponible en appuyant sur la gauche </span>
			</div>
			<div className='gui'>
				<div className='is-flex' style={{ justifyContent: 'end' }}>
					<button className='fluent_btn' onClick={handleToogleOpen} style={{ width: 110 }}>
						<img src={del} className='svg_white' alt='Interrogation' />
						Fermer
					</button>
				</div>
				<input
					className='blue'
					style={{ color: '#d9d9d9' }}
					type='text'
					placeholder='Rechercher une autre gare'
					onChange={handleOnChange}
					value={value}
					autoFocus
				/>
				{
					isLoading && <div>
						<div className='progress-bck'></div>
						<div className='progress indeterminate'></div>
					</div>
				}
				<br />
				<div className='stopList'>

					{
						stops && stops.map(stop => <span
							onClick={handleOnChange}
							key={stop.stop_point.name}>
							<Link
								to={`/${selectedStyle}/${selectedType}/${stop.stop_point.uic_code}?gui`}
								className='overmouse'
							>
								{stop.stop_point.name}
							</Link>
						</span>
						)
					}

					<div className='about'>
						<br />
						<div className='hr' />
						<br />
						<img src={logo} className='logo' alt='Logo MyLines Embed' />
						<br />
						<span>
							MyLines 2021 - {new Date().getFullYear()} • Version {packageJson.version}
							<br />
							Made with 💖
						</span>
						<br />
						<a className='mini_btn' href='https://github.com/MaisClement/MyLinesEmbed'>
							<img className='svg_white' src={github} alt='github' />
						</a>
						<a className='mini_btn' href='http://discord.mylines.fr'>
							<img className='svg_white' src={discord} alt='discord' />
						</a>
						<a className='mini_btn' href='mailto:clementf78@gmail.com'>
							<img className='svg_white' src={mail} alt='mail' />
						</a>
					</div>
				</div>
			</div>

			<div className='gui-menu'>
			</div>
			<div className='gui-back' onClick={handleToogleOpen} />
		</>;
	} else {
		return <div className='gui-show' onClick={handleToogleOpen} >
			<span className='bigger'> Options disponible en appuyant sur la gauche </span>
		</div>;
	}
};

export default GUI;