/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef, useCallback } from 'react';
import Marquee from 'react-fast-marquee';
import { useParams } from 'react-router-dom';
import md5 from 'md5';

import { createDate, formatTime, getService } from '../utils';

import ori from '../assets/img/ori.png';

import '../assets/css/IENA.css';

const IENA = ({ trains, setType, setStop, setAuth }) => {
	let { type, stop, auth } = useParams();

	const [showInfo, setShowInfo] = useState(true);

	useEffect(() => {
		init();

		const interval = setInterval(() => {
			setShowInfo(info => !info);
		}, 3000);

		return () => clearInterval(interval);
	}, []);

	const init = () => {
		setType(type);
		setStop(stop);
		setAuth(auth);
	};

	const style = {
		width: '100vw',
		height: '100vh',
		opacity: 0.4,
		position: 'absolute',
		left: 0,
		right: 0,
	};

	return <>
		<img src={ori} alt='ori' style={style} />
		<div className='IENA'>
			<div className={type}>
				<div className='head'>
					<IENAClock />
					<span className='title'>
						{type == 'departure'
							? 'Prochains Trains'
							: 'Prochaines Arrivées'
						}
					</span>
					<span className='track'>
						Voie
					</span>
				</div>

				{
					trains && trains.slice(0, 6).map((train, index) => <Train
						key={train.informations.trip_name}
						index={index}
						type={type}
						auth={auth}
						informations={train.informations}
						stop_date_time={train.stop_date_time}
						stops={train.stops}
						showInfo={showInfo}
					/>
					)
				}
			</div>
		</div>
	</>;
};

const Train = ({ index, type, auth, informations, stop_date_time, stops, showInfo }) => {
	const display = ['départ1 max', 'départ2 max', 'départ1 min', 'départ2 min', 'départ1 min', 'départ2 min', 'départ1 min', 'départ2 min'];
	const tail = {
		'departure': 'direction',
		'arrival': 'origin'
	};

	function getService(network, auth = null) {
		if (auth) {
			return `https://mylines.fr/embed?serv=${network}&auth=${auth}`;
		}
		return `https://mylines.fr/embed?serv=${network}`;
	}

	const base_time = createDate(stop_date_time[`base_${type}_date_time`]);
	const time = createDate(stop_date_time[`base_${type}_date_time`]);
	const head = informations[tail[type]].name;

	let hsah = md5(head + informations.code);
	const track = auth
		? isNaN(hsah.substring(0, 1))
			? '-'
			: (Math.random() * 10)
		: '-';

	return <div className='départ'>
		<table className={index < 2 ? 'départmax' : 'départmin'}>
			<tbody>
				<tr>
					<td className='img' rowSpan='2'>
						<img src={getService(informations.network, auth)} alt='Logo service' />
					</td>
					<td className='miss'>
						{informations.code.substring(0, 4)}
					</td>
					<td className='dest'>
						<div>{head}</div>
					</td>
					<td className='time'>
						<IENATime time={time} /></td>
				</tr>
				{
					index < 2 &&
					<tr>
						<td colSpan={3}>
							<IENAMarquee
								index={index}
								stops={stops}
							/>
						</td>
					</tr>
				}
			</tbody>
		</table>
		<div className={index < 2 ? 'track tracki' : 'track trackc'}>
			<div className='num'>
				{track}
			</div>
		</div>
	</div>;
};

function IENATime({ time }) {
	let diff = time - new Date();
	const h = Math.floor(diff / 1000 / 60 / 60);
	diff -= h * 1000 * 60 * 60;
	const m = Math.floor(diff / 1000 / 60);
	diff -= m * 1000 * 60;

	if (m <= 1)
		return <b>à quai</b>;

	if (h < 1)
		return `${m} mn`;

	return `${formatTime(time.getHours())}:${formatTime(time.getMinutes())}`;
}

const IENAMarquee = ({ index, stops }) => {
	useEffect(() => {
		const interval = setInterval(scroll, 3000);

		return () => clearInterval(interval);
	}, []);

	const [count, setCount] = useState(0);
	const [height, setHeight] = useState(0);
	const [containerHeight, setContainerHeight] = useState(0);
	const [lineHeight, setLineHeight] = useState(0);

	const scroll = () => {
		const line = containerHeight / lineHeight; // nombre de lignes au total
		const height = lineHeight * count;

		console.log(containerHeight, lineHeight, line, count, height);
		
		setHeight(`${height}px`);
		setCount(count => count + 1);
	};

	const stopsRef = useCallback(node => {
		if (node !== null) {
			setContainerHeight(node.getBoundingClientRect().height);
			console.log(node.getBoundingClientRect().height);
		}
	}, []);

	const stopRef = useCallback(node => {
		if (node !== null) {
			setLineHeight(node.getBoundingClientRect().height);
			console.log(node.getBoundingClientRect().height);
		}
	}, []);

	return <div>
		<div className='stops-container'>
			<div className='stops' ref={stopsRef} style={{top: height}}>
				{stops.map((stop, i) => (
					<span className='stop' ref={stopRef} key={stop.stop_point.name}>
						{stop.stop_point.name}
						<span className='dot'>
							<span className='dot-inner' />
							<span className='dot-outer' />
						</span>
					</span>
				))}
			</div>
		</div>
	</div>;
};

function IENAClock() {
	const [time, setTime] = useState(new Date());

	useEffect(() => {
		const interval = setInterval(() => {
			setTime(new Date());
		}, 100);

		return () => clearInterval(interval);
	}, []);

	const formatTime = (value) => {
		return value.toString().padStart(2, '0');
	};

	const hours = formatTime(time.getHours());
	const minutes = formatTime(time.getMinutes());

	return <span className='IENA-time'>
		<span className='hour'>
			{hours}
			<span style={{ opacity: time.getMilliseconds() < 500 ? 1 : 0 }}>:</span>
			{minutes}
		</span>
	</span>;
}

export default IENA;