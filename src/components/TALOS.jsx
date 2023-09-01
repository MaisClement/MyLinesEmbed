
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Textfit } from 'react-textfit';

import { createDate, formatTime } from '../utils';

import '../assets/css/TALOS.css';

import interrogation from '../assets/img/interogation.png';
import ok from '../assets/img/valid.png';
import late from '../assets/img/warning.png';
import error from '../assets/img/error.png';

const TALOS = ({ trains, setType, setStop, setAuth, setStyle }) => {
	let { type, stop, auth } = useParams();

	useEffect(() => {
		init();
	}, [type, stop, auth]);

	const init = () => {
		setType(type);
		setStop(stop);
		setAuth(auth);
		setStyle('TALOS');
	};

	const title = {
		'departure': 'Prochains départs',
		'arrival': 'Prochaines arrivées'
	};

	return <div className='TALOS'>
		<div className={type}>
			<div className='head'>
				<TALOSClock />
				<span className='title'>
					{trains && `${trains[0].informations.stop_point} • `}
					{title[type]}
				</span>
				<span className='track'>
					Voie
				</span>
			</div>

			{
				trains && trains.slice(0, 7).map((train, index) => <Train
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

const Train = ({ type, auth, informations, stop_date_time }) => {
	const tail = {
		'departure': 'direction',
		'arrival': 'origin'
	};

	const base_time = createDate(stop_date_time[`base_${type}_date_time`]);
	const time = createDate(stop_date_time[`base_${type}_date_time`]);
	const head = informations[tail[type]].name;

	function getService(network, auth = null) {
		if (auth) {
			return `https://mylines.fr/image?serv=${network}&auth=${auth}`;
		}
		return `https://mylines.fr/image?serv=${network}`;
	}

	return <>
		<div className={`départ ${getClass(informations.message, informations.status, time, base_time)}`}>
			<div className='img'>
				<img src={getService(informations.network, auth)} alt='Logo service' />
			</div>
			<div className='miss'>
				{informations.code.substring(0, 4)}
			</div>
			<TALOSTime
				informations={informations}
				time={time}
				base_time={base_time}
			/>
			<div className='dest'>
				<div>{head}</div>
			</div>
		</div>
		<img src={getImage(informations.message, informations.status, time, base_time)} className='trafic' />
	</>;
};

function TALOSTime({ informations, time, base_time }) {
	return <>
		<div className='time'>
			<Textfit mode='single'>
				{`${formatTime(time.getHours())}:${formatTime(time.getMinutes())}`}
			</Textfit>
		</div>
		<TALOSMessage
			informations={informations}
			time={time}
			base_time={base_time}
		/>
	</>;
}

function TALOSMessage({ informations, time, base_time }) {

	if (informations.status == 'deleted')
		return <span className='message_delete'>
			<b> Supprimé </b>
		</span>;

	if (informations.status == 'late' || informations.status == 'real_time')
		return <span className='message'>
			<b> Retardé </b>
		</span>;

	let diff = time - base_time;
	const h = Math.floor(diff / 1000 / 60 / 60);
	diff -= h * 1000 * 60 * 60;
	const m = Math.floor(diff / 1000 / 60);
	diff -= m * 1000 * 60;

	if (diff > 0) {
		return 'late';
	}
	else if (informations.message == 'idf') {
		return <span className='message_info'>
			<b> Retardé </b>
		</span>;
	}
	return null;
}




function TALOSClock() {
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

	return <span className='TALOS-time'>
		<span className='hour'>
			<Textfit mode='single'>
				{hours}
				<span style={{ opacity: time.getMilliseconds() < 500 ? 1 : 0 }}>:</span>
				{minutes}
			</Textfit>
		</span>
	</span>;
}


const getClass = ({ message, status, time, base_time }) => {
	if (status == 'deleted')
		return 'deleted';

	if (status == 'late' || status == 'real_time')
		return 'late';

	let diff = time - base_time;
	const h = Math.floor(diff / 1000 / 60 / 60);
	diff -= h * 1000 * 60 * 60;
	const m = Math.floor(diff / 1000 / 60);
	diff -= m * 1000 * 60;

	if (diff > 0) {
		return 'late';
	}
	else if (message == 'idf') {
		return 'interrogation';
	}
	return 'ok';
};

const getImage = ({ message, status, time, base_time }) => {
	if (status == 'deleted')
		return error;

	if (status == 'late' || status == 'real_time')
		return late;

	let diff = time - base_time;
	const h = Math.floor(diff / 1000 / 60 / 60);
	diff -= h * 1000 * 60 * 60;
	const m = Math.floor(diff / 1000 / 60);
	diff -= m * 1000 * 60;

	if (diff > 0) {
		return late;
	}
	else if (message == 'idf') {
		return interrogation;
	}
	return ok;
};

export default TALOS;