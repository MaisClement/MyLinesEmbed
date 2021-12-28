import React from 'react';
import Marquee from 'react-fast-marquee';
import update from 'react-addons-update';
import { useParams } from 'react-router-dom';

import Error from './error';
import Gui from './gui';

import whiteLogo from './SNCF_white.png';
import './SNCF.css';

class SNCFDeparture extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
            trains: [],
            showInfo: true,
            uic_code: 0,
            error: '',
            error_message: '',
        };
        this.getTrain();
	}
	
	componentDidMount() {
		this.timerID = setInterval(
			() => this.getTrain(),
			50000
		);
        this.timerTick = setInterval(
            () => this.tick(),
            3000
        );
	}
	
	componentWillUnmount() {
		clearInterval(this.timerID);
        clearInterval(this.timerTick);
	}

    tick() {
		this.setState({
			showInfo: (!this.state.showInfo)
		});
        if (this.state.uic_code != this.props.stop)
            this.getTrain();
	}
	
	getTrain() {
        let stop = this.props.stop;
        const url = 'https://api.mylines.fr/sncf/departures?stop=' + stop;
        //https://api.sncf.com/v1/coverage/sncf/vehicle_journeys/vehicle_journey:SNCF:2021-12-17:859550:1187:Tramway
        
		fetch(url, {
            method: 'get'
        })
        .then(res => res.json())
        .then(data => {
            if (data.error && data.error == '200') {
                this.setState({
                    error: ':/',
                    error_message: 'La gare indiqué ne semble pas exister. Vérifier l\'url saisie ou réessayez dans quelques minutes.'
                }); 
            } else if (data.error) {
                this.setState({
                    error: ':/',
                    error_message: data.error_message,
                }); 
            }
            this.setState({
                trains: data.departures,
                uic_code: stop
            });
        })
        .catch(err => {
            this.setState({
                error: ':/',
                error_message: 'Récupération des trains impossible.'
            }); 
            console.log(err);
        });
	}

	render(){
        if (this.state.error != 0 || this.state.error != ''){
            return (
                <Error
                    type = {0}
                    error = {this.state.error}
                    error_message = {this.state.error_message}
                />
            );
        } else {
            return (
                <> 
                    <div className='from'>
                        <table>
                        <tbody>
                        {this.state.trains.slice(0, 7).map((train, i) => (
                            <SNCFDepartureTrain 
                                key={i} 
                                train = {train}
                                number={i}
                                showInfo = {this.state.showInfo}
                            />
                        ))}
                        </tbody>
                        </table>
                        <Clock />
                        <Back />
                    </div>
                        <Gui 
                        style = {'SNCF'}
                        type = {'departure'}
                    />
                </>      
            );
        }
	}
}

class SNCFDepartureTrain extends React.Component {
	render(){
        if (typeof this.props.train === 'undefined') {
            return (
                <>
                </>
            );
        }

        let display = ['départ1 max','départ2 max','départ1 min','départ2 min','départ1 min','départ2 min','départ1 min','départ2 min'];

        let direction = this.props.train.informations.direction.name;

        let network = this.props.train.informations.network;
        let name = this.props.train.informations.trip_name;
        let departure;
        let base_time;

        if (typeof this.props.train.stop_date_time.base_departure_date_time !== 'undefined') {
            departure = createDate(this.props.train.stop_date_time.base_departure_date_time);
            base_time = this.props.train.stop_date_time.base_departure_date_time;
        } else {
            departure = createDate(this.props.train.stop_date_time.departure_date_time);
            base_time = this.props.train.stop_date_time.departure_date_time;
        }

        let real_time = this.props.train.stop_date_time.departure_date_time;
        let status = this.props.train.stop_date_time.status;

        let number = this.props.number;
        let showInfo = this.props.showInfo;

        return (
            <>
                <tr className={display[this.props.number]}>
                    <td className="img"><img src={'https://mylines.fr/embed/image.php?serv=' + network} alt="Logo service"/></td>
                    <td className="trafic">
                        {showInfo ? <Info real_time={real_time} base_time={base_time} status={status}/> : <span className="Id">{network}<br/><b>{name}</b> </span>}
                    </td>
                    <td className="time">{(departure.getHours() < 10) ? '0' + departure.getHours() : departure.getHours()}h{(departure.getMinutes() < 10) ? '0' + departure.getMinutes() : departure.getMinutes()}</td>
                    <td className="dest">{direction}</td>
                    <td className="track"></td>
                </tr>
                {number < 2 ? <SNCFDepartureMarquee number={number} key={number} train={this.props.train} stop={this.props.train.stops}/> : <></>}
            </>
        );
	}
}

class SNCFDepartureMarquee extends React.Component {
    constructor(props) {
		super(props);
		this.state = {
            play: true,
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

        if (marqueeRef < stopRef){
            this.setState({
                play: false
            });
        } else {
            this.setState({
                play: true
            });
        }
	}

	render(){
        var display = ['départ1 max','départ2 max'];

        if (typeof this.props.stop != 'undefined') {
            return (
                <tr className={display[this.props.number]}>
                    <td className="void"></td>
                    <td colspan="3">
                        <div className="stop" ref={this.stopRef}>
                            <Marquee
                                key = {this.props.number}
                                gradient = {false}
                                speed = {90 + this.props.number}
                                play = {this.state.play}
                            >
                                <div ref={this.marqueeRef}>
                                    {this.props.stop.map((stop, i) => (
                                        <>
                                            <span>{stop.stop_point.name}</span>
                                            {i != this.props.stop.length-1 ? <span className="space"></span> : <></>}
                                        </>
                                    ))}
                                </div>
                                <div className="marqueeSpace"></div>
                            </Marquee>
                        </div>
                    </td>
                    <td className="track"></td>
                </tr>
            );
        } else {
            return(
                <tr className={display[this.props.number]}>
                    <td className="void"></td>
                    <td colspan="3"></td>
                    <td className="track"></td>
                </tr>
            );
        }
        
	}
}

class Clock extends React.Component {
	constructor(props) {
		super(props);
		this.state = {date: new Date()};
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

	render(){
		let style = {};
		if (this.state.milli > 500)
			style = { color: "#fff0" };
		else
			style = { color: "#fff" };
		return (
			<span className="curentTime">
				<span className="hour">
					{this.state.hour}<span style={style}>:</span>{this.state.minute}
					<span class="minute"> {this.state.second}</span>
				</span>
			</span>
		);
	}
}

class Info extends React.Component {
	render(){

        let real_time = this.props.real_time;
        let base_time = this.props.base_time;
        let status = this.props.status;

        if (status == 'deleted')
            return ( <span className="deleted"> supprimé </span> );

        if (real_time == base_time)
            return ( <span className="info"> à l'heure </span> );

        real_time = createDate(real_time);
        base_time = createDate(base_time);
        
        
        if (real_time < base_time) {
            real_time.setDate(real_time.getDate() + 1);
        }
        
        var diff = real_time - base_time;
        var msec = diff;
        var hh = Math.floor(msec / 1000 / 60 / 60);
        msec -= hh * 1000 * 60 * 60;
        var mm = Math.floor(msec / 1000 / 60);
        msec -= mm * 1000 * 60;

        console.log(diff);

        if (hh == 0)
            return (
                <span className="retard"> retard <br/> {mm} min. </span>
            )
        else 
            return (
                <span className="retard"> retard <br/> {hh}h{mm} </span>
            )
	}
}

function Back() {
	return (
		<span className="arr">départs</span>
	);
}

function createDate(date){
    let el = new Date(date.substring(0, 4), date.substring(4, 6), date.substring(6, 8), date.substring(9, 11), date.substring(11, 13), date.substring(13, 15), 0); 
    return el;
}

function SNCFd() {
    let params = useParams();
    return <SNCFDeparture stop = {params.stop} />;
} 

export default SNCFd;