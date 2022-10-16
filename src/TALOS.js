import React from 'react';
import Marquee from 'react-fast-marquee';
import md5 from 'md5';
import update from 'react-addons-update';
import { useParams } from 'react-router-dom';

import Error from './error';
import Gui from './gui';

import error from './assets/img/error.png';
import valid from './assets/img/valid.png';
import warning from './assets/img/warning.png';
import interogation from './assets/img/interogation.png';
import maintenance from './assets/img/maintenance.png';

import './assets/css/TALOS.css';

class TALOS extends React.Component {
    render(){
        return(
            <> 
                <div className='TALOS'>
                    <div className={this.props.type}>
                        <div className="head">
                            <span className="head-title">
                                {this.props.gare == "" ?
                                    <></>
                                    :
                                    <>{this.props.gare} • </>
                                }
                                {this.props.type == "departure" ?
                                    <>Prochains départs</>
                                    :
                                    <>Prochaines arrivées</>
                                }
                            </span>
                        </div>

                        <TALOSClock />

                        {this.props.trains ?
                            <div>
                                {this.props.trains.slice(0, 6).map((train, i) => (
                                    <TALOSTrain 
                                        key = {i} 
                                        train = {train}
                                        number = {i}
                                        auth = {this.props.auth}
                                        showInfo = {this.props.showInfo}
                                        type = {this.props.type}
                                        marquee = {this.props.marquee}
                                    />
                                ))}
                            </div>
                        :
                            <div className="no-train">
                                <h1>C'est drôlement calme...</h1>
                                <p>
                                    Il n'y a aucun train à afficher. <br/>
                                    Si vous pensez qu’il s’agit d'un problème des infogare, n’hésitez pas à remonter le problème sur le serveur discord. 
                                </p>
                            </div>
                        }

                    </div>
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
class TALOSTrain extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            track: 0,
            train: 0
        };
    }

    style(){
        if (this.state.track != 0 && this.state.train){
            if (this.props.number < 2)
                return { top: this.state.train + (window.innerHeight * 0.011) + 'px' };
            else
                return { top: this.state.train + (window.innerHeight * 0.011) + 'px' };
		} else
			return { opacity: 0 };
    }

	render(){
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
        
        if (typeof this.props.train.stop_date_time.base_departure_date_time !== 'undefined') {
			created_base_time = createDate(this.props.train.stop_date_time.base_departure_date_time);
			base_time = this.props.train.stop_date_time.base_departure_date_time;
		} else {
			created_base_time = createDate(this.props.train.stop_date_time.departure_date_time);
			base_time = this.props.train.stop_date_time.departure_date_time;
		}
		real_time = this.props.train.stop_date_time.departure_date_time;

        let status = this.props.train.informations.status;
        let message = this.props.train.informations.message;

        const number = this.props.number;

        let track;

        if (window.location.href.indexOf('mylines.fr/embed') >= 0){

        } else {
            track = '-';
        }
        
        
        let hsah = md5(head + code);
        if (!isNaN(hsah.substring(0, 1))){
            track = '-'
        } else {
            track = 2
        }

        let state = getClass(status, message, real_time, base_time);
        let type_img;

        if (state == 'ok')
            type_img = valid;

        else if (state == 'late')
            type_img = warning;

        else if (state == 'deleted')
            type_img = error;

        else
            type_img = interogation;

        track = '-';
        
        return (
            <>  
				<div className={getClass(status, message, real_time, base_time) + ' départ'}>
                    <span className="class">
                        <img  className="class_img" src={'https://mylines.fr/image?serv=' + network.trim() + '&auth=' + this.props.auth} alt="Logo service"/>
                    </span>
                    <span className="miss">{code.substring(0, 4)}</span>
                    <span className="time">{(created_base_time.getHours() < 10) ? '0' + created_base_time.getHours() : created_base_time.getHours()}:{(created_base_time.getMinutes() < 10) ? '0' + created_base_time.getMinutes() : created_base_time.getMinutes()}</span>
                    <TALOSInfo real_time={real_time} base_time={base_time} status={status} message={message}/>
                    <span className="dest"><div>{head}</div></span>
                    
                </div>
                <img src={type_img} className='trafic_img' />
			</>
        );
	}
}

class TALOSInfo extends React.Component {
	render(){

        let real_time = this.props.real_time;
        let base_time = this.props.base_time;
        let status = this.props.status;
        let message = this.props.message;

        if (status == 'deleted')
            return ( <span className="trafic_delete"><b> Supprimé </b></span> );

        if (status == 'late')
            return ( <span className="trafic"><b> Retardé </b></span> );

        if (status == 'real_time')
            return ( <span className="trafic"><b> Retardé </b></span> );

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

        if (mm > 0 && hh >= 0){
            if (hh == 0)
                    return ( <span className="trafic"><b> +{mm}’</b> </span> );
                else 
                    return ( <span className="trafic"><b> +{hh}h{mm + hh*60}’</b> </span> );
        } else if (message == 'idf')
            return ( <span className="trafic_info"><b> Théorique </b></span> );
        else
            return ( <></> );
        
	}   
}


class TALOSClock extends React.Component {
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

		hour = (hour < 10) ? '0' + hour : hour;
		minute = (minute < 10) ? '0' + minute : minute;

		this.setState({
			hour: hour,
			minute: minute,
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
            <span className="hour">
                {this.state.hour}<span style={this.style()}>:</span>{this.state.minute}
            </span>
		);
	}
}

function createDate(date){
    let el = new Date(date.substring(0, 4), date.substring(4, 6), date.substring(6, 8), date.substring(9, 11), date.substring(11, 13), 0, 0); 
    return el;
}

function getClass(status, message, real_time, base_time){

    if (status == 'deleted' || status == 'late' || status == 'real_time')
        return "deleted";

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

    if (mm > 0){
        return "late";
    } else if (message == 'idf')
        return 'interrogation'
    else
        return "ok";
}

export default TALOS;