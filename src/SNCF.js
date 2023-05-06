/* eslint-disable no-mixed-spaces-and-tabs */
import React from 'react';
import Marquee from 'react-fast-marquee';

import Gui from './gui';

import './assets/css/SNCF.css';

class SNCF extends React.Component {
	render() {
		return <>
			<div className='SNCF'>
				<div className={this.props.type}>
					<table>
						<tbody>

							{this.props.trains ?
								<>
									{this.props.trains.slice(0, 7).map((train, i) => (
										<SNCFTrain
											key={train.informations.trip_name}
											train={train}
											number={i}
											auth={this.props.auth}
											showInfo={this.props.showInfo}
											type={this.props.type}
										/>
									))}
								</>
								:
								<div className='alert'>
									<Marquee
										gradient={false}
										speed={90}
										play={true}
									>
										<div>
                                            Il n’y a aucun train à afficher. Si vous pensez qu’il s’agit d’un problème des infogare, n’hésitez pas à remonter le problème sur le serveur discord.
										</div>
										<div className='marqueeSpace'></div>
									</Marquee>
								</div>
							}

						</tbody>
					</table>
					<SNCFClock />
					<Back arr={this.props.arr} />
				</div>
			</div>
			<div className='hover'>
			</div>
			{
				window.location.href.indexOf('gui') !== -1
                && <Gui
                	auth={this.props.auth}
                	opt={this.props.opt}
                	gare={this.props.gare}
                />
			}
		</>;
	}
}
class SNCFTrain extends React.Component {
	constructor(props) {
		super(props);
		this.state = { width: window.innerWidth };

		this.handleResize = this.handleResize.bind(this);
	}

	handleResize() {
		this.setState({ width: window.innerWidth });
	}

	componentDidMount() {
		window.addEventListener('resize', this.handleResize);
	}

	componentWillUnmount() {
		window.addEventListener('resize', this.handleResize);
	}

	render() {
		if (typeof this.props.train === 'undefined') {
			return null;
		}

		let display = ['départ1 max', 'départ2 max', 'départ1 min', 'départ2 min', 'départ1 min', 'départ2 min', 'départ1 min', 'départ2 min'];
		let head;

		if (this.props.type == 'departure')
			head = this.props.train.informations.direction.name;
		else
			head = this.props.train.informations.origin.name;

		let network = this.props.train.informations.network;
		let code = this.props.train.informations.code;
		let name = this.props.train.informations.trip_name;

		let real_time;
		let base_time;
		let created_base_time;

		if (this.props.type == 'departure') {
			if (typeof this.props.train.stop_date_time.base_departure_date_time !== 'undefined') {
				created_base_time = createDate(this.props.train.stop_date_time.base_departure_date_time);
				base_time = this.props.train.stop_date_time.base_departure_date_time;
			} else {
				created_base_time = createDate(this.props.train.stop_date_time.departure_date_time);
				base_time = this.props.train.stop_date_time.departure_date_time;
			}
			real_time = this.props.train.stop_date_time.departure_date_time;
		} else {
			if (typeof this.props.train.stop_date_time.base_arrival_date_time !== 'undefined') {
				created_base_time = createDate(this.props.train.stop_date_time.base_arrival_date_time);
				base_time = this.props.train.stop_date_time.base_arrival_date_time;
			} else {
				created_base_time = createDate(this.props.train.stop_date_time.arrival_date_time);
				base_time = this.props.train.stop_date_time.arrival_date_time;
			}
			real_time = this.props.train.stop_date_time.arrival_date_time;
		}

		let status = this.props.train.informations.status;
		let message = this.props.train.informations.message;

		let number = this.props.number;
		let showInfo = this.props.showInfo;

		return (
			<>
				<tr className={display[this.props.number]}>
					<td className='img'><img src={'https://mylines.fr/embed?serv=' + network.trim() + '&auth=' + this.props.auth} alt='Logo service' /></td>
					<td className='trafic'>
						{showInfo ? <SNCFInfo real_time={real_time} base_time={base_time} status={status} message={message} /> : <span className='Id'>{code}<br /><b>{name}</b> </span>}
					</td>
					<td className='time'>{(created_base_time.getHours() < 10) ? '0' + created_base_time.getHours() : created_base_time.getHours()}h{(created_base_time.getMinutes() < 10) ? '0' + created_base_time.getMinutes() : created_base_time.getMinutes()}</td>
					<td className='dest'>{head}</td>
					<td className='track'></td>
				</tr>
				{
					number < 2 &&
                    <SNCFMarquee number={number} train={this.props.train} stop={this.props.train.stops} />
				}
			</>
		);
	}
}
class SNCFMarquee extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			play: false,
			widthMarquee: 0,
			widthStop: 0
		};

		this.marqueeRef = React.createRef();
		this.stopRef = React.createRef();
	}

	componentDidMount() {
		this.timer = setInterval(
			() => this.tick(),
			50
		);
	}

	componentWillUnmount() {
		clearInterval(this.timer);
	}

	tick() {
		let marqueeRef = this.marqueeRef.current.getBoundingClientRect().width;
		let stopRef = this.stopRef.current.getBoundingClientRect().width;

		this.setState({
			widthMarquee: marqueeRef,
			widthStop: stopRef
		});

		if (marqueeRef < stopRef) {
			this.setState({
				play: false
			});
		} else {
			this.setState({
				play: true
			});
		}
	}

	render() {
		var display = ['départ1 max', 'départ2 max'];

		if (typeof this.props.stop != 'undefined') {
			return <tr className={display[this.props.number]}>
				<td className='void'></td>
				<td colSpan={3}>
					<div className='stop' ref={this.stopRef}>
						<Marquee
							key={this.props.train.informations.trip_name}
							gradient={false}
							speed={90 + this.props.number}
							play={this.state.play}
						>
							<div ref={this.marqueeRef}>
								{this.props.stop.map((stop, i) => (
									<>
										<span>{stop.stop_point.name}</span>
										{
											i != this.props.stop.length - 1 &&
                                            <span className='dot'></span>
										}
									</>
								))}
							</div>
							<div className='marqueeSpace'></div>
						</Marquee>
					</div>
				</td>
				<td className='track'></td>
			</tr>;
		} else {
			return <tr className={display[this.props.number]}>
				<td className='void'></td>
				<td colSpan={3}></td>
				<td className='track'></td>
			</tr>;
		}

	}
}
class SNCFClock extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			date: new Date()
		};
	}

	componentDidMount() {
		this.timerID = setInterval(
			() => this.tick(),
			100
		);
	}

	componentWillUnmount() {
		clearInterval(this.timerID);
	}

	tick() {
		let date = new Date();
		let hour = date.getHours();
		let minute = date.getMinutes();
		let second = date.getSeconds();

		hour = (hour < 10) ? '0' + hour : hour;
		minute = (minute < 10) ? '0' + minute : minute;
		second = (second < 10) ? '0' + second : second;

		this.setState({
			hour: hour,
			minute: minute,
			second: second,
			milli: date.getMilliseconds()
		});
	}

	style() {
		if (this.state.milli > 500)
			return { opacity: 0 };
		else
			return { opacity: 1 };
	}

	render() {
		return <span className='sncf-time'>
			<span className='hour'>
				{this.state.hour}<span style={this.style()}>:</span>{this.state.minute}
				<span className='minute'> {this.state.second}</span>
			</span>
		</span>;
	}
}
class SNCFInfo extends React.Component {
	render() {

		let real_time = this.props.real_time;
		let base_time = this.props.base_time;
		let status = this.props.status;
		let message = this.props.message;

		if (status == 'deleted')
			return <span className='deleted'> supprimé </span>;

		if (status == 'late' || status == 'real_time')
			return <span className='deleted'> retardé </span>;

		real_time = createDate(real_time);
		base_time = createDate(base_time);


		if (real_time < base_time) {
			real_time.setDate(real_time.getDate());
		}

		var diff = real_time - base_time;
		var msec = diff;
		var hh = Math.floor(msec / 1000 / 60 / 60);
		msec -= hh * 1000 * 60 * 60;
		var mm = Math.floor(msec / 1000 / 60);
		msec -= mm * 1000 * 60;

		if (mm > 0) {
			if (message == 'idf_realtime') {
				if (hh == 0)
					return <span className='late'>
						<b> + {mm}’</b> 
					</span>;
				else
					return <span className='late'>
						<b> + {hh}h{mm + hh * 60}’</b>
					</span>;
			} else {
				if (hh == 0)
					return <span className='late'> retard <br /> {mm} min. </span>;
				else
					return <span className='late'> retard <br /> {hh}h{mm} </span>;
			}
		} else
			return <span className='info'> à l’heure </span>;
	}
}
class Back extends React.Component {
	render() {
		return <span className='arr'>{this.props.arr}</span>;
	}
}

function createDate(date) {
	let el = new Date(date.substring(0, 4), date.substring(4, 6), date.substring(6, 8), date.substring(9, 11), date.substring(11, 13), 0, 0);
	return el;
}


export default SNCF;