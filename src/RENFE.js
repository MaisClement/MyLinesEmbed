import React from 'react';
import Marquee from 'react-fast-marquee';
import md5 from 'md5';
import update from 'react-addons-update';
import { useParams } from 'react-router-dom';

import Error from './error';
import Gui from './gui';

import adif from './assets/img/adif.svg';

import './assets/css/RENFE.css';

class RENFE extends React.Component {
    render(){
        return(
            <> 
                <div className='RENFE'>
                    <table className="timetable">
                        <tbody>
                        <RENFEHead 
                            type = {this.props.type}
                        />
                        {this.props.trains.slice(0, 7).map((train, i) => (
                            <RENFETrain 
                                key = {i} 
                                train = {train}
                                number = {i}
                                auth = {this.props.auth}
                                showInfo = {this.props.showInfo}
                                type = {this.props.type}
                            />
                        ))}
                        </tbody>
                    </table>
                </div>
                <div className='hover'>
                </div>
                { window.location.href.indexOf('gui') != -1 ?
                    <Gui 
                        auth = {this.props.auth}
                        opt = {this.props.opt}
                        gare = {this.props.gare}
                    />
                    :
                    <></>
                }
            </>      
        )
    }
}
class RENFETrain extends React.Component {
	render(){
        if (typeof this.props.train === 'undefined') {
            return (
                <>
                </>
            );
        }

        let head;

        if (this.props.type == 'departure')
            head = this.props.train.informations.direction.name.toUpperCase();
        else
            head = this.props.train.informations.origin.name.toUpperCase();

        const network = this.props.train.informations.network;
        const code = this.props.train.informations.code;
        const name = this.props.train.informations.trip_name;

        let real_time;
        let base_time;
        let created_base_time;
        
        if (this.props.type == 'departure'){
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

        const status = this.props.train.informations.status;
        const message = this.props.train.informations.message;

        let track;
        let hsah = md5(head + code);
        if (!isNaN(hsah.substring(0, 1))){
            track = hsah.substring(0, 1);
        } else {
            track = 2
        }

        return (
            <>
                <tr>
                    <td>{(created_base_time.getHours() < 10) ? '0' + created_base_time.getHours() : created_base_time.getHours()}:{(created_base_time.getMinutes() < 10) ? '0' + created_base_time.getMinutes() : created_base_time.getMinutes()}</td>
                    <td>{head}</td>
                    <td><img src={'https://mylines.fr/image.php?serv=' + network.trim() + '&auth=' + this.props.auth} alt="Logo service"/></td>
                    <td>{name}</td>
                    <td>{track}</td>
                    <td>
                        <RENFEInfo real_time={real_time} base_time={base_time} status={status} message={message}/>
                    </td>
                </tr>
			</>
            
        );
	}
}
class RENFEHead extends React.Component {
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

    style(){
        if (this.state.milli > 500)
			return { opacity: 0 };
		else
            return { opacity: 1 };
    }

	render(){
		return (
            <>
                <tr>
                    <td width="7%;" className="current-time center">{this.state.hour}<span style={this.style()}>:</span>{this.state.minute}</td>
                    <td width="40%;">
                        {
                            this.props.type == 'departure' ?
                            <>
                                <span className="salidas-title">Salidas |</span> <span className="smaller-title">DEPARTURES</span>
                            </>
                            :
                            <>
                                <span className="salidas-title">Llegadas |</span> <span className="smaller-title">ARRIVALS</span>
                            </>
                        }
                    </td>
                    <td width="10%;"></td>
                    <td width="5%;"></td>
                    <td width="5%;"></td>
                    <td width="13%;"><img src={adif} /></td>
                </tr>
                <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>
                <tr className='head'>
                    <td>Hora</td>
                    {
                        this.props.type == 'departure' ?
                        <>
                            <td>Destino</td>
                        </>
                        :
                        <>
                            <td>Procedencia</td>
                        </>
                    }
                    <td>Tren</td>
                    <td>Número</td>
                    <td>Vía</td>
                    <td>Observaciones</td>
                </tr>
                <tr className='head'>
                    <td>TIME</td>
                    {
                        this.props.type == 'departure' ?
                        <>
                            <td>DESTINATION</td>
                        </>
                        :
                        <>
                            <td>COMING SOON</td>
                        </>
                    }
                    <td>TRAIN</td>
                    <td>NUMBER</td>
                    <td>PLATFORM</td>
                    <td>OBSERVATIONS</td>
                </tr>
            </>
		);
	}
}
class RENFEInfo extends React.Component {
	render(){

        let real_time = this.props.real_time;
        let base_time = this.props.base_time;
        let status = this.props.status;
        let message = this.props.message;

        if (status == 'deleted')
            return ( <span className="retard"> CANCELADO </span> );

        if (status == 'orange')
            return ( <span className="retard"> DEMORADO </span> );

        if (status == 'real_time')
            return ( <span className="retard"> DEMORADO </span> );

        real_time = createDate(this.props.real_time);
        base_time = createDate(this.props.base_time);
        
        
        if (real_time < base_time) {
            real_time.setDate(real_time.getDate());
        }
        
        var diff = real_time - base_time;
        var msec = diff;
        var hh = Math.floor(msec / 1000 / 60 / 60);
        msec -= hh * 1000 * 60 * 60;
        var mm = Math.floor(msec / 1000 / 60);
        msec -= mm * 1000 * 60;

        if (mm > 0){
            return ( <span className="orange"> EST. {(real_time.getHours() < 10) ? '0' + real_time.getHours() : real_time.getHours()}:{(real_time.getMinutes() < 10) ? '0' + real_time.getMinutes() : real_time.getMinutes()} </span> );  
        } else
            return ( <></>);
	}   
}

function createDate(date){
    let el = new Date(date.substring(0, 4), date.substring(4, 6), date.substring(6, 8), date.substring(9, 11), date.substring(11, 13), 0, 0); 
    return el;
}


export default RENFE;