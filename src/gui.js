import React from 'react';
import Marquee from 'react-fast-marquee';
import update from 'react-addons-update';
import { useParams, Link, Router, BrowserRouter } from "react-router-dom";

import Error from './error';

import whiteLogo from './assets/img/SNCF_white.png';
import departure from './assets/img/departure.png';
import arrival from './assets/img/arrival.png';
import logo from './assets/img/Logo.png';
import github from './assets/img/github.svg';
import discord from './assets/img/discord.svg';
import mail from './assets/img/mail.svg';

import './assets/css/SNCF.css';

class GuiSearch extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
            show: false,
            load: false,
            q: '',
            cur: 0,
            type: 0,
            opt: 'SNCF/departure',
            stops: [],
        };
        this.getStops('');

        this.handleChange = this.handleChange.bind(this);
        this.handleKey = this.handleKey.bind(this);

        this.handleOpt = this.handleOpt.bind(this);
	}

    componentDidMount(){
        this.searchInput.focus();

        if (typeof this.props.opt !== 'undefined')
            this.setState({
                opt: this.props.opt
            });
    }

    handleChange(event) {
        this.setState({
            q: event.target.value,
            cur: 0
        });
        this.getStops(event.target.value);
    }

    handleKey(event) {
        if (event.keyCode == 40 && this.state.cur < this.state.len){
            this.setState({ cur: this.state.cur + 1 });
            event.preventDefault();

        } else if (event.keyCode == 38 && this.state.cur != 0){
            this.setState({ cur: this.state.cur - 1 });
            event.preventDefault();
        
        } else if (event.keyCode == 13){
            
            let url = '/' + this.state.opt + '/' + this.state.stops[this.state.cur].stop_point.uic_code;
            window.location = url;
            event.preventDefault();
        }
    }

    handleOpt(event){
        this.setState({
            opt: event.target.value
        });
    }
		
	getStops(q) {
        this.setState({ load: true });

        const url = 'https://api.mylines.fr/sncf/search?q=' + q;
        //https://api.sncf.com/v1/coverage/sncf/vehicle_journeys/vehicle_journey:SNCF:2021-12-17:859550:1187:Tramway
        
		fetch(url, {
            method: 'get'
            })
        .then(res => res.json())
        .then(data => {
            this.setState({
                stops: data.stop_points,
                len: (data.stop_points.length -1),
                load: false
            });
        })
        .catch(err => {
            this.setState({ load: false });
        });
	}

    opt(a, b){
        if (a == b) return true;
        return false;
    }

	render(){
        let opt = this.props.opt;

        return (
            <>
                <div className="gui">
                    {this.props.displayForce == false ? <div onClick={this.props.show} className="close">Fermer</div> : <></>}                    
                        <br/>
                    <input type="text" placeholder="Rechercher une autre gare" ref={inputEl => (this.searchInput = inputEl)} onChange={this.handleChange} onKeyDown={this.handleKey} autocomplete="off" /> 
                    {this.state.load ? <div> <div class="progress-bck"></div> <div class="progress indeterminate"></div></div> : <></>}
                        <br />
                    <div className="stopList"> 
                   
                        {this.state.stops.map((stop, i) => (
                            <GuiStop 
                                key = {i}
                                stop = {stop}
                                onover = {i == this.state.cur ? true : false}
                                
                                opt = {this.state.opt}
                                show = {this.props.show}
                            />
                        ))}
                        {this.state.stops.length == 0 ? <div className="center">Aucun résultat</div> : <></>}

                        <div className="about">
                                <br/>
                            <div className="hr"></div>
                                <br/>
                            <img src={logo} className="logo" alt="Logo MyLines Embed" />
                                <br/>
                            <span>
                                MyLines 2020 - {new Date().getFullYear()} • Version 1.1.0 <br/>
                                Made with 💖
                            </span>
                                <br/>    
                            <a href="https://github.com/MaisClement/MyLinesEmbed" className="mini_fluent_btn"> <img src={github} alt="github" /> </a>
                            <a href="http://discord.mylines.fr" className="mini_fluent_btn"> <img src={discord} alt="discord" /> </a>
                            <a href="mailto:admin@mylines.fr" className="mini_fluent_btn"> <img src={mail} alt="mail"/> </a>
                        </div>
                    </div>
                </div>

                <div className="guiOpt">
                    <div className="hr"></div>
                    <h3>Style d'affichage</h3>

                    <div class="cc-selector">
                        <input type="radio" defaultChecked={this.opt(opt, 'SNCF/departure')}   id="departure" name="select"    value="SNCF/departure" onClick={this.handleOpt}/>
                        <label className="selectcard-cc departure-card"       for="departure"></label>
                        <input type="radio" defaultChecked={this.opt(opt, 'SNCF/arrival')}   id="arrival"   name="select"    value="SNCF/arrival" onClick={this.handleOpt}/>
                        <label className="selectcard-cc arrival-card"         for="arrival"></label>
                    </div>

                </div>

                <div className='guiBack' onClick={this.props.show}> </div>
            </>
        );
	}
}

class GuiStop extends React.Component {
	constructor(props) {
		super(props);
	}

	render(){        
        let stop = this.props.stop;
        let name = stop.stop_point.name;
        let id = stop.stop_point.uic_code;
        let onover = this.props.onover;

        let url = '/' + this.props.opt + '/'

        return (
            <Link to={url + id} className={onover == true ? 'overmouse2' : 'overmouse'} onClick={this.props.show}>
                <div>
                {name}
                </div>
            </Link>
        );
	}
}

class Gui extends React.Component {
	constructor(props) {
		super(props);
        this.state = {
            show: false,
            displayForce: false
        };
        
        this.show = this.show.bind(this);
	}

    componentDidMount(){
        if (typeof this.props.display !== 'undefined' && this.props.display == true)
            this.setState({
                show: true,
                displayForce: true
            });
    }

    show() {
        if (this.state.displayForce == false)
            this.setState({
                show: (!this.state.show)
            });
    }

	render(){
        return (
            <>
                {this.state.displayForce == false ? <div className="gui-show" onClick={this.show}> <span> Options disponible en appuyant sur la gauche </span> </div> : <></>}
                {this.state.show == true ? <GuiSearch show={this.show} opt={this.props.opt} displayForce={this.state.displayForce} version={this.props.version} /> : <></>}
            </>
        );
	}
}

export default Gui;