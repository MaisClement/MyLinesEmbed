import React from 'react';
import Marquee from 'react-fast-marquee';
import md5 from 'md5';
import update from 'react-addons-update';
import { useParams } from 'react-router-dom';
import { FlapDisplay, Presets } from 'react-split-flap-effect'

import Error from './error';
import Gui from './gui';

import adif from './assets/img/adif.svg';

import './assets/css/FLAPS.css';

class FLAPS extends React.Component {
    constructor(props) {
		super(props);
		this.state = {
            trains: [],
        };
	}

    render(){
        return(
            <> 
                <div className='FLAPS'>
                    <table className="timetable darkBordered L">
                        <tbody>
                        <FLAPSHead 
                            type = {this.props.type}
                        />
                        {this.props.trains.slice(0, 7).map((train, i) => (
                            <FLAPSTrain 
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
class FLAPSTrain extends React.Component {
    render(){
        if (typeof this.props.train === 'undefined' || this.props.train == []) {
            return (
                <> </>
            );
        }
        if (!this.props.train.informations){
            return (
                <> </>
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
                    <td>
                        {network}
                    </td>
                    <td></td>
                    <td>
                        <FlapDisplay
                            chars = {Presets.NUM}
                            length = {7}
                            value = {name.toString()}
                            padMode = {'end'}
                            hinge = {true}
                            className = "darkBordered"
                        />
                    </td>
                    <td></td>
                    <td>
                        <FlapDisplay
                            chars = {Presets.ALPHANUM + 'àâéèçîï.,-\'"!/'}
                            length = {25}
                            value = {head.toString()}
                            padMode = {'auto'}
                            hinge = {true}
                        />
                    </td>
                    <td></td>
                    <td className='time'>
                        <FlapDisplay
                            chars = {Presets.NUM}
                            length = {2}
                            value = {((created_base_time.getHours() < 10) ? '0' + created_base_time.getHours() : created_base_time.getHours()).toString()}
                            padMode = {'start'}
                            hinge = {true}
                        />
            
                        <span className='time_separator'>H</span>
            
                        <FlapDisplay
                            chars = {Presets.NUM}
                            length = {2}
                            value = {((created_base_time.getMinutes() < 10) ? '0' + created_base_time.getMinutes() : created_base_time.getMinutes()).toString()}
                            padMode = {'start'}
                            hinge = {true}
                        />
                    </td>
                    <td></td>
                    <td>
                        <FlapDisplay
                            chars = {Presets.NUM}
                            length = {2}
                            value = {track.toString()}
                            padMode = {'start'}
                            hinge = {true}
                        />
                    </td>
                    <td>
                        <FLAPSInfo real_time={real_time} base_time={base_time} status={status} message={message}/>
                    </td>
                </tr>
			</>
            
        );
	}
}
class FLAPSHead extends React.Component {
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
                <tr className='head'>
                    <td>Train</td>
                    <td className="td_space"></td>
                    <td>N°</td>
                    <td className="td_space"></td>
                    <td>Destination</td>
                    <td className="td_space"></td>
                    <td>Départ</td>
                    <td className="td_space"></td>
                    <td>Voie</td>
                    <td className="td_last_space"></td>
                    <td></td>
                </tr>
            </>
		);
	}
}
class FLAPSInfo extends React.Component {
	render(){

        let real_time = this.props.real_time;
        let base_time = this.props.base_time;
        let status = this.props.status;
        let message = this.props.message;

        if (status == 'deleted')
            return ( <FlapDisplay
                        value = {'retardé'}
                        words = {["","à l'heure","retardé","supprimé","retard"]}
                        padMode = {'start'}
                        hinge = {true}
                    /> 
                    );

        if (status == 'orange' || status == 'real_time')
            return ( <FlapDisplay
                        value = {'supprimé'}
                        words = {["","à l'heure","retardé","supprimé","retard"]}
                        padMode = {'start'}
                        hinge = {true}
                    /> 
                    );

        real_time = createDate(this.props.real_time);
        base_time = createDate(this.props.base_time);
        
        
        if (real_time < base_time) {
            real_time.setDate(real_time.getDate());
        }
        
        var diff = real_time - base_time;
        var msec = diff;
        var mm = Math.floor(msec / 1000 / 60);
        msec -= mm * 1000 * 60;

        if (mm > 5){
            return ( <FlapDisplay
                        value = {'retard ' + mm + ' mn'}
                        words = {["","à l'heure","retardé","supprimé","retard", 'retard ' + mm + ' mn']}
                        padMode = {'start'}
                        hinge = {true}
                    /> );  
        } else
            return ( <FlapDisplay
                value = {"à l'heure"}
                words = {["","à l'heure","retardé","supprimé","retard"]}
                padMode = {'start'}
                hinge = {true}
            />);
	}   
}

function createDate(date){
    let el = new Date(date.substring(0, 4), date.substring(4, 6), date.substring(6, 8), date.substring(9, 11), date.substring(11, 13), 0, 0); 
    return el;
}


export default FLAPS;