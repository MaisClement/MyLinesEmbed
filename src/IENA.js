import React from 'react';
import Marquee from 'react-fast-marquee';
import md5 from 'md5';
import update from 'react-addons-update';
import { useParams } from 'react-router-dom';

import Error from './error';
import Gui from './gui';

import './assets/css/IENA.css';

class IENA extends React.Component {
    render(){
        return(
            <> 
                <div className='IENA'>
                    <div className={this.props.type}>
                        <div className="head">
                            <span className="head-title">
                                {this.props.type == "departure" ?
                                    <>Prochains départs</>
                                    :
                                    <>Prochaines Arrivées</>
                                }
                                	
                            </span>
                            <span className="voie">Voie</span>
                        </div>

                        <IENAClock />

                        <div>
                            {this.props.trains.slice(0, 6).map((train, i) => (
                                <IENATrain 
                                    key = {i} 
                                    train = {train}
                                    number = {i}
                                    showInfo = {this.props.showInfo}
                                    type = {this.props.type}
                                />
                            ))}
                        </div>

                    </div>
                </div>
                { window.location.href.indexOf('gui') != -1 ?
                    <Gui 
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
class IENATrain extends React.Component {

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
        
        if (this.props.type == 'departure'){
            real_time = createDate(this.props.train.stop_date_time.departure_date_time);
        } else {
            real_time = createDate(this.props.train.stop_date_time.arrival_date_time);
        }

        let status = this.props.train.informations.status;
        let message = this.props.train.informations.message;

        let number = this.props.number;
        let showInfo = this.props.showInfo;
        let track;

        let hsah = md5(head + code);
        if (!isNaN(hsah.substring(0, 1))){
            track = hsah.substring(0, 1);
        } else {
            track = 2
        }
        
        return (
            <>  
				<div 
                    ref={el =>{
                            if (!el)return; 
                            if (typeof this.state.track === 'undefined') return; 
                            if (this.state.track == el.getBoundingClientRect().top) return;
                            this.setState({track :el.getBoundingClientRect().top}) 
                        }} 
                    style={this.style()}
                    className={this.props.number < 2 ? 'track tracki' : 'track trackc'}>
                    <div className="num">{track}</div></div>
                <table 
                    ref={el =>{
                            if (!el)return; 
                            if (typeof this.state.train === 'undefined') return; 
                            if (this.state.train == el.getBoundingClientRect().top) return;
                            this.setState({train :el.getBoundingClientRect().top}) 
                        }} 
                        className={this.props.number < 2 ? 'départ départmax' : 'départ départmin'}>
                    <tbody>
                        <tr>
                            <td className="img" rowSpan="2"><img src={'https://mylines.fr/embed/image.php?serv=' + network} alt="Logo service"/></td>
                            <td className="miss">{code.substring(0, 4)}</td>
                            <td className="dest"><div>{head}</div></td>
                            <td className="time"><IENATime created_hour = {real_time.getHours()} created_min = {real_time.getMinutes()}/></td>
                        </tr>
                        {number < 2 ?
                            <tr>
                                <td colSpan="3">  <IENAMarquee number={number} key={number} train={this.props.train} stop={this.props.train.stops}/> </td>
                            </tr>
                            :
                            <></>
                        }
                    </tbody>
                </table>
			</>
        );
	}
}
class IENATime extends React.Component {
    constructor(props) {
		super(props);
		this.state = {
            timer: 0,
            time: 0,
            cur: 0
        };
        this.tick();
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

        let cur = minute + (60 * hour);
        let time = this.props.created_min + (60 * this.props.created_hour);


		this.setState({
            cur: cur,
            time: time,
			timer: time - cur
		});
	}

	render(){
		return (
            <>
                {this.state.timer < 60 && this.state.timer > 0 ?
                    <>{this.state.timer} mn</>
                    :
                        this.state.timer <= 0 && this.state.timer >= -5 ?
                            <><b>à quai</b></>
                            :
                            <>{this.props.created_hour}:{this.props.created_min}</>

                }
            </>
		);
	}
}
class IENAMarquee extends React.Component {
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
                    {this.props.width < 800 ? 
					    <></>
                        :
                        <td className="void"></td>
                    }
                    <td colSpan="3">
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
                                            {i != this.props.stop.length-1 ? <> &gt; </> : <></>}
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
                    <td colSpan="3"></td>
                    <td className="track"></td>
                </tr>
            );
        }
        
	}
}
class IENAClock extends React.Component {
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
            <span className="iena-time">
                <span className="hour">
                    {this.state.hour}<span style={this.style()}>:</span>{this.state.minute}
                </span>
            </span>
		);
	}
}


function createDate(date){
    let el = new Date(date.substring(0, 4), date.substring(4, 6), date.substring(6, 8), date.substring(9, 11), date.substring(11, 13), 0, 0); 
    return el;
}


export default IENA;