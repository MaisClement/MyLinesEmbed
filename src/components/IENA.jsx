import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';

import { createDate, formatTime, getService } from '../utils';

import '../assets/css/IENA.css';

const IENA = ({ trains, setType, setStop, setAuth, setStyle }) => {
	let { type, stop, auth } = useParams();

	useEffect(() => {
		init();
	}, [type, stop, auth]);

	const init = () => {
		setType(type);
		setStop(stop);
		setAuth(auth);
		setStyle('IENA');
	};

	const title = {
		'departure': 'Prochains Trains',
		'arrival': 'Prochaines Arrivées'
	};

	return <div className='IENA'>
		<div className={type}>
			<div className='head'>
				<IENAClock />
				<span className='title'>
					{title[type]}
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
				/>
				)
			}
		</div>
	</div>;
};

const Train = ({ index, type, auth, informations, stop_date_time, stops }) => {
	const tail = {
		'departure': 'direction',
		'arrival': 'origin'
	};

	const time = createDate(stop_date_time[`base_${type}_date_time`]);
	const head = informations[tail[type]].name;

	const track = '-';

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

	if (h == 0 && m <= 1)
		return <b>à quai</b>;

	if (h < 1)
		return `${m} mn`;

	return `${formatTime(time.getHours())}:${formatTime(time.getMinutes())}`;
}

function IENAMarquee({ stops }) {
	const [count, setCount] = useState(null);
	const [stopsHeight, setStopsHeight] = useState(null);
	// eslint-disable-next-line no-unused-vars
	const [lineHeight, setLineHeight] = useState(null);
	const [containerHeight, setContainerHeight] = useState(null);

	useEffect(() => {
		const interval = setInterval(() => {
			setCount(count => count + 1);
		}, 5000);

		return () => clearInterval(interval);
	}, []);

	const stopsRef = useCallback(node => {
		if (node !== null) {
			setStopsHeight(node.getBoundingClientRect().height);
		}
	}, []);

	const stopRef = useCallback(node => {
		if (node !== null) {
			setLineHeight(node.getBoundingClientRect().height);
		}
	}, []);

	const containerRef = useCallback(node => {
		if (node !== null) {
			setContainerHeight(node.getBoundingClientRect().height);
		}
	}, []);

	function getStyle() {
		const nb_line =	stopsHeight / lineHeight;
		const height = (containerHeight * count) % (containerHeight * nb_line);
		return { top: `-${height}px` };
	}

	function getStopHeight() {
		return { height: `${containerHeight}px` };
	}

	function getAnim() {
		const nb_line =	stopsHeight / lineHeight;
		const height = (containerHeight * count) % (containerHeight * nb_line);
		if (height == 0) {
			return 'init';
		}
		return '';
	}

	return <div>
		<div className='stops-container' ref={containerRef}>
			<div className={`stops ${getAnim()}`} ref={stopsRef} style={getStyle()}>
				{stops.map((stop) => (
					<span className='stop' ref={stopRef} key={stop.stop_point.name} style={getStopHeight()}>
						<span className='dot'>
							<span className='dot-inner' />
							<span className='dot-outer' />
						</span>
						{stop.stop_point.name}
					</span>
				))}
			</div>
		</div>
	</div>;
}

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