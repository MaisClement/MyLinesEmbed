import React from 'react';
import Marquee from 'react-fast-marquee';
import update from 'react-addons-update';
import { useParams, Link, Router, BrowserRouter } from "react-router-dom";

import Error from './error';
import whiteLogo from './SNCF_white.png';
import './SNCF.css';

class GuiSearch extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
            show: false,
            q: '',
            cur: 0,
            load: false,
            stops: [],
        };
        this.getStops('');

        this.handleChange = this.handleChange.bind(this);
        this.handleKey = this.handleKey.bind(this);
	}

    componentDidMount(){
        this.searchInput.focus();
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
            
            let url = '/' + this.props.style + '/' + this.props.type + '/' + this.state.stops[this.state.cur].fields.uic_code.substring(2);
            window.location = url;
            event.preventDefault();
        }
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
                stops: data,
                len: (data.length -1),
                load: false
            });
        })
        .catch(err => {
            this.setState({ load: false });
        });
	}

	render(){
        return (
            <>
                <div className="gui">
                    <div onClick={this.props.show} className="close">Fermer</div>
                        <br/>
                    <input type="text" placeholder="Rechercher une autre gare" ref={inputEl => (this.searchInput = inputEl)} onChange={this.handleChange} onKeyDown={this.handleKey} autocomplete="off" /> 
                    {this.state.load ? <div> <div class="progress-bck"></div> <div class="progress indeterminate"></div></div> : <></>}
                    <br /><br />
                    <div className="stopList"> 
                        {this.state.stops.map((stop, i) => (
                            <GuiStop 
                                key = {i}
                                stop = {stop}
                                onover = {i == this.state.cur ? true : false}
                                
                                style = {this.props.style}
                                type = {this.props.type}
                                show = {this.props.show}
                            />
                        ))}
                    </div>
                    A propos - MyLines 2020 - 2021
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
        let name = stop.fields.gare_alias_libelle_noncontraint;
        let id = stop.fields.uic_code.substring(2);
        let onover = this.props.onover;

        let url = '/' + this.props.style + '/' + this.props.type + '/'

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
            show: false
        };
        
        this.show = this.show.bind(this);
	}

    show() {
        this.setState({
            show: (!this.state.show)
        });
    }

	render(){
        return (
            <>
                <div className="gui-show" onClick={this.show}>
                    <span>
                        Options disponible en appuyant sur la gauche
                    </span>
                </div>
                {this.state.show == true ? <GuiSearch show={this.show} style={this.props.style} type={this.props.type} /> : <></>}
            </>
        );
	}
}

export default Gui;