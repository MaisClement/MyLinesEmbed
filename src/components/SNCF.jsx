
import React, { useState, useEffect, useCallback } from 'react';
import Marquee from 'react-fast-marquee';
import { useParams } from 'react-router-dom';

import {createDate, formatTime, getService} from '../utils';

import '../assets/css/SNCF.css';

const SNCF = ({ trains, setType, setStop, setAuth, setStyle }) => {
	let { type, stop, auth } = useParams();

	const [showInfo, setShowInfo] = useState(true);

	useEffect(() => {
		init();

		const interval = setInterval(() => {
			setShowInfo(info => !info);
		}, 3000);

		return () => clearInterval(interval);
	}, []);

	useEffect(() => {
		init();
	}, [type, stop, auth]);

	const init = () => {
		setType(type);
		setStop(stop);
		setAuth(auth);
		setStyle('SNCF');
	};

	const arr = {
		'departure': 'départs',
		'arrival': 'arrivées',
	};

	return <div className='SNCF'>
		<div className={type}>
			<table>
				<tbody>

					{
						trains && trains.slice(0, 7).map((train, index) => <Train
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

				</tbody>
			</table>

			<SNCFClock />
			<span className='arr'>{arr[type]}</span>
		</div>
	</div>;
};

const Train = ({ index, type, auth, informations, stop_date_time, stops, showInfo }) => {
	const display = ['départ1 max', 'départ2 max', 'départ1 min', 'départ2 min', 'départ1 min', 'départ2 min', 'départ1 min', 'départ2 min'];
	const tail = {
		'departure': 'direction',
		'arrival': 'origin'
	};

	const base_time = createDate(stop_date_time[`base_${type}_date_time`]); // stop_date_time[`base_${type}_date_time`];
	const time = createDate(stop_date_time[`base_${type}_date_time`]);
	const head = informations[tail[type]].name;

	return <>
		<tr className={display[index]}>
			<td className='img'>
				<img src={getService(informations.network, auth)} alt='Logo service' />
			</td>
			<td className='trafic'>
				{
					showInfo
						? <SNCFInfo
							time={time}
							base_time={base_time}
							status={informations.status}
							message={informations.message}
						/>
						: <span className='id'>
							<span>{informations.code}</span>
							<br />
							<b>{informations.trip_name}</b>
						</span>
				}
			</td>
			<td className='time'>
				<span>{formatTime(base_time.getHours())}</span>
				h
				<span>{formatTime(base_time.getMinutes())}</span>
			</td>
			<td className='dest'>
				{head}
			</td>
			<td className='track'></td>
		</tr>
		{
			index < 2 &&
			<SNCFMarquee
				index={index}
				stops={stops}
			/>
		}
	</>;
};

const SNCFMarquee = ({ index, stops }) => {
	const display = ['départ1 max', 'départ2 max'];

	const [stopWidth, setStopWidth] = useState(0);
	const [marqueeWidth, setMarqueeWidth] = useState(0);

	const stopRef = useCallback(node => {
		if (node !== null) {
			setStopWidth(node.getBoundingClientRect().width);
		}
	}, []);

	const marqueeRef = useCallback(node => {
		if (node !== null) {
			setMarqueeWidth(node.getBoundingClientRect().width);
		}
	}, []);

	return <tr className={display[index]}>
		<td className='void' />
		<td colSpan={3}>
			<div className='stop' ref={stopRef}>
				<Marquee
					gradient={false}
					speed={90}
					play={marqueeWidth > stopWidth}
				>
					<div ref={marqueeRef}>
						{stops.map((stop, i) => (
							<>
								<span>{stop.stop_point.name}</span>
								{
									i < stops.length - 1 &&
									<span className='dot' />
								}
							</>
						))}
					</div>
					<div className='marqueeSpace' />
				</Marquee>
			</div>
		</td>
		<td className='track' />
	</tr>;
};

const SNCFInfo = ({ message, status, time, base_time }) => {
	if (status == 'deleted')
		return <span className='deleted'> supprimé </span>;

	if (status == 'late' || status == 'real_time')
		return <span className='deleted'> retardé </span>;

	let diff = time - base_time;
	const h = Math.floor(diff / 1000 / 60 / 60);
	diff -= h * 1000 * 60 * 60;
	const m = Math.floor(diff / 1000 / 60);
	diff -= m * 1000 * 60;

	if (diff > 0) {
		if (message == 'idf_realtime') {
			return <span className='late'>
				<b> + {m + h * 60}’</b>
			</span>;
		}

		if (h > 0)
			return <span className='late'> retard <br /> {h}h{m} </span>;

		return <span className='late'> retard <br /> {m} min. </span>;
	}

	return <span className='info'> à l’heure </span>;
};

function SNCFClock() {
	const [time, setTime] = useState(new Date());

	useEffect(() => {
		const interval = setInterval(() => {
			setTime(new Date());
		}, 100);

		return () => clearInterval(interval);
	}, []);

	const hours = formatTime(time.getHours());
	const minutes = formatTime(time.getMinutes());
	const seconds = formatTime(time.getSeconds());

	return <span className='sncf-time'>
		<span className='hour'>
			{hours}
			<span style={{ opacity: time.getMilliseconds() < 500 ? 1 : 0 }}>:</span>
			{minutes}
			{' '}
			<span className='minute'>{seconds}</span>
		</span>
	</span>;
}

export default SNCF;