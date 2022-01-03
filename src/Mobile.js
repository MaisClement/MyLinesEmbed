import React from 'react';
import Marquee from 'react-fast-marquee';
import update from 'react-addons-update';
import { useParams } from 'react-router-dom';

import Error from './error';
import Gui from './gui';

import back from './assets/img/back.svg';
import phone from './assets/img/phone.svg';
import './assets/css/SNCF.css';

class Mobile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showDetails: false,
            showId: 0
        };

        this.showDetails = this.showDetails.bind(this);
    }
    
    showDetails(id) {
		this.setState({
            showDetails: (!this.state.showDetails),
            showId: id
        });
	}


    render(){
        let beforestop = true;
        return(
            <> 
                <div className={this.props.type}>
                    <div className="Mobile">
                        {this.state.showDetails == true ?
                            <MobileDetails 
                                showDetails = {this.showDetails}
                                train = {this.props.trains[this.state.showId]}
                                number = {this.state.showId}
                                type = {this.props.type}
                            />
                        :
                            <>
                                {this.props.trains.lenght == 0 ?
                                    <div></div>
                                :
                                    <div className="mobile-global">
                                        {this.props.trains.map((train, i) => (
                                            <el className='mobile-a' onClick={(e) => {
                                                    this.showDetails(i);
                                                }}>
                                                <MobileTrain 
                                                key = {i} 
                                                train = {train}
                                                number = {i}
                                                showInfo = {this.props.showInfo}
                                                type = {this.props.type}
                                            />
                                            </el>
                                        ))}
                                    </div>
                                }
                            </>
                        }
                    </div>
                </div>               
                <MobileClock />
                
                {this.props.opt.indexOf('mobile') >= 0 ?
                        <></>
                    :
                        <table className="alert-rotate">
                            <tr>
                                <td>
                                    <img src={phone} alt='rotate' className='phone'/>
                                </td>
                                <td>
                                    Changez l'orientation de votre apareil pour l'affichage complet.
                                </td>
                            </tr>
                        </table>
                }
                <Gui 
                    opt = {this.props.opt}
                    gare = {this.props.gare}
                    mobile = {this.props.mobile}
                />
            </>     
        )
    }
}
class MobileTrain extends React.Component {
    constructor(props) {
        super(props);
        this.state = { width: window.innerWidth };

        this.handleResize = this.handleResize.bind(this);
    }
    
    handleResize(e){
        this.setState({ width: window.innerWidth });
    };
    
    componentDidMount() {
        window.addEventListener("resize", this.handleResize);
    }
    
    componentWillUnmount () {
        window.addEventListener("resize", this.handleResize);
    } 

	render(){
        if (typeof this.props.train === 'undefined') {
            return (
                <>
                </>
            );
        }

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

        let status = this.props.train.informations.status;
        let message = this.props.train.informations.message;

        return (
            <>
                <table>
                    <tbody>
                        <tr>
                            <td className="dest">
                                <img src={'https://mylines.fr/embed/image.php?serv=' + network} className='img' alt="Logo service"/>
                                {head}
                            </td>
                            <td className="time" rowSpan={2}>
                                <span>{(created_base_time.getHours() < 10) ? '0' + created_base_time.getHours() : created_base_time.getHours()}:{(created_base_time.getMinutes() < 10) ? '0' + created_base_time.getMinutes() : created_base_time.getMinutes()}</span>
                                    <br />
                                <MobileInfo real_time={real_time} base_time={base_time} status={status} message={message}/>
                            </td>
                            
                        </tr>
                        <tr className='train'>
                            <td className="trafic"> {code} - {name} </td>
                        </tr>
                    </tbody>
                </table>
				
                <div className='hr'></div>
			</>
            
        );
	}
}
class MobileDetails extends React.Component {
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

        let status = this.props.train.informations.status;
        let message = this.props.train.informations.message;

        return(
            <>
                <div class="gui-mobile head-mobile">
                    <img src={back} alt="retour" onClick={this.props.showDetails}/>
                    <span> <b>{head}</b> - {code} </span>
                </div>

                <div className='mobile-detail'>
                    <br />
                    <table>
                        <tbody>
                            <tr>
                                <td rowSpan={2} className='mobile-img'>
                                    <img src={'https://mylines.fr/embed/image.php?serv=' + network} className='img' alt="Logo service"/>            
                                </td>
                                <td rowSpan={2} className='mobile-time'>
                                    <span className='time'>{(created_base_time.getHours() < 10) ? '0' + created_base_time.getHours() : created_base_time.getHours()}:{(created_base_time.getMinutes() < 10) ? '0' + created_base_time.getMinutes() : created_base_time.getMinutes()}</span>
                                        <br />
                                    <MobileInfo real_time={real_time} base_time={base_time} status={status} message={message} displayAll={true}/>
                                </td>
                                <td>
                                    <b>{head}</b>
                                </td>
                            </tr>
                            <tr>    
                                <td>
                                    {code} - {name}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                        <br />
                    <div className='hr'></div>
                        <br />
                    <div className='stops'>
                        {this.props.train.all_stops.map((stop, i) => (
                            <>
                                <div key = {i} >
                                    {i == 0 ? <span className="stop-dots2"></span> : <><span className="stop-line"></span> <span className="stop-dots"></span></>}
                                    
                                    
                                    <span className='stop'>
                                        {i == 0 ? <b>{stop.stop_point.name}</b> : <>{stop.stop_point.name}</>}
                                    </span>
                                </div>
                            </> 
                        ))}
                    </div>
                    <br />
                    <br />
                </div>                 
            </> 
        );
    }
}
class MobileClock extends React.Component {
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
            <span className="head-time">
                {this.state.hour}<span style={this.style()}>:</span>{this.state.minute}
            </span> 
		);
	}
}
class MobileInfo extends React.Component {
	render(){

        let real_time = this.props.real_time;
        let base_time = this.props.base_time;
        let status = this.props.status;
        let message = this.props.message;

        if (status == 'deleted')
            return ( <span className="deleted"> supprimé </span> );

        if (status == 'late')
            return ( <span className="late"> retardé </span> );

        if (status == 'real_time')
            return ( <span className="late"> temps réel </span> );
        
        if (message == 'idf')
            return ( <span className="info"> théorique </span> );

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
            if (message == 'idf_realtime'){
                if (hh == 0 && mm <= 5)
                    return ( <span className="info"> + {mm} min </span> );
                else if (hh == 0)
                    return ( <span className="late"> + {mm} min </span> );
                else 
                    return ( <span className="late"> + {hh}h{mm} </span> );
            } else {
                if (hh == 0)
                    return ( <span className="late"> retard : {mm} min </span> );
                else 
                    return ( <span className="late"> retard : {hh}h{mm} </span> );
            }
        } else if (typeof this.props.displayAll !== 'undefined')
            return ( <span className="info"> à l'heure </span> );
        else
            return ( <></> );
	}   
}
class Back extends React.Component {
    render(){
        return (
            <span className="arr">{this.props.arr}</span>
        );
    }
}
function createDate(date){
    let el = new Date(date.substring(0, 4), date.substring(4, 6), date.substring(6, 8), date.substring(9, 11), date.substring(11, 13), 0, 0); 
    return el;
}



export default Mobile;