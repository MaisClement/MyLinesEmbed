/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import logo from '../assets/img/Logo.png';
import packageJson from '../../package.json';
import '../assets/css/TALOS.css';

import github from '../assets/img/github.svg';
import discord from '../assets/img/discord.svg';
import mail from '../assets/img/mail.svg';
import del from '../assets/img/delete.svg';

import RadioCard from '../helpers/RadioCard';
import Card from '../helpers/Card';

// eslint-disable-next-line no-unused-vars
const GUI = ({ auth, type, style, forceOpen, setError }) => {

	const [isOpened, setIsOpened] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [display, setDisplay] = useState(`${style}/${type}`);
	const [value, setValue] = useState('');
	const [stops, setStops] = useState(null);

	useEffect(() => {
		getStops();
	}, []);

	useEffect(() => {
		setDisplay(`${style}/${type}`);
	}, [type, style]);

	function handleToogleOpen() {
		setIsOpened(isOpened => !isOpened);
	}

	async function handleOnChange(event) {
		setValue(event.currentTarget.value);
		await getStops();
	}

	async function handleOnChangeRadio(event) {
		setDisplay(event);
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
							{
								auth
									? <Link
										onClick={handleToogleOpen}
										to={`${display}/${stop.stop_point.uic_code}/${auth}?gui`}
										className='overmouse'
									>
										{stop.stop_point.uic_code}{stop.stop_point.name}
									</Link>
									: <Link
										onClick={handleToogleOpen}
										to={`${display}/${stop.stop_point.uic_code}?gui`}
										className='overmouse'
									>	
										{stop.stop_point.name}
									</Link>
							}

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
							Made with 💖 / In Tartiflette we trust 
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
				<h3>Style d’affichage</h3>
				<RadioCard
					onChange={handleOnChangeRadio}
				>
					<Card
						content={'SNCF/departure'}
						value={display}
						name={'opt'}
						img={SNCFd}
					/>
					<Card
						content={'SNCF/arrival'}
						value={display}
						name={'opt'}
						img={SNCFa}
					/>
					<br /><br />
					<Card
						content={'IENA/departure'}
						value={display}
						name={'opt'}
						img={IENAd}
					/>
					<Card
						content={'IENA/arrival'}
						value={display}
						name={'opt'}
						img={IENAa}
					/>
					<br /><br />
					<Card
						content={'TALOS/departure'}
						value={display}
						name={'opt'}
						img={TALOSd}
					/>
					<Card
						content={'TALOS/arrival'}
						value={display}
						name={'opt'}
						img={TALOSa}
					/>
				</RadioCard>
			</div>
			<div className='gui-back' onClick={handleToogleOpen} />
		</>;
	}
	if (!forceOpen) {
		return <div className='gui-show' onClick={handleToogleOpen} >
			<span className='bigger'> Options disponible en appuyant sur la gauche </span>
		</div>;
	}
};

import IENAd from '../assets/img/IENAd.png';
import SNCFa from '../assets/img/SNCFa.png';
import SNCFd from '../assets/img/SNCFd.png';
import TALOSa from '../assets/img/TALOSa.png';
import TALOSd from '../assets/img/TALOSd.png';
import IENAa from '../assets/img/IENAa.png';

export default GUI;