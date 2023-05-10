import React from 'react';
import { Link } from 'react-router-dom';

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
			query: '',
			curent: 0,
			type: 0,
			opt: 'SNCF/departure',
			stops: [],
		};
		this.getStops('');

		this.handleChange = this.handleChange.bind(this);
		this.handleKey = this.handleKey.bind(this);

		this.handleOpt = this.handleOpt.bind(this);
	}

	componentDidMount() {
		this.searchInput.focus();

		if (typeof this.props.opt !== 'undefined')
			this.setState({
				opt: this.props.opt
			});
	}

	handleChange(event) {
		this.setState({
			query: event.target.value,
			curent: 0
		});
		this.getStops(event.target.value);
	}

	handleKey(event) {
		if (event.keyCode === 40 && this.state.curent < this.state.len) {
			this.setState({ curent: this.state.curent + 1 });
			event.preventDefault();

		} else if (event.keyCode === 38 && this.state.curent !== 0) {
			this.setState({ curent: this.state.curent - 1 });
			event.preventDefault();

		} else if (event.keyCode === 13) {

			let url;
			if (window.location.href.indexOf('mylines.fr/embed') >= 0)
				url = '/embed/' + this.state.opt + '/' + this.state.stops[this.state.curent].stop_point.uic_code + '/' + this.props.auth + '?gui';
			else
				url = '/' + this.state.opt + '/' + this.state.stops[this.state.curent].stop_point.uic_code + '?gui';

			window.location = url;
			event.preventDefault();
		}
	}

	handleOpt(event) {
		this.setState({
			opt: event.target.value
		});
	}

	getStops(query) {
		this.setState({ load: true });

		let url;
		if (window.location.href.indexOf('mylines.fr/embed') >= 0)
			url = 'https://api.mylines.fr/te/search?auth=' + this.props.auth + '&q=' + query;
		else
			url = 'https://api.mylines.fr/sncf/search?q=' + query;

		fetch(url, {
			method: 'get'
		})
			.then(res => res.json())
			.then(data => {
				this.setState({
					stops: data.stop_points,
					len: (data.stop_points.length - 1),
					load: false
				});
			})
			.catch(() => {
				this.setState({ load: false });
			});
	}

	opt(a, b) {
		if (a === b) return true;
		return false;
	}

	render() {
		let opt = this.props.opt;

		return <>
			<div className='gui'>
				{this.props.displayForce === false &&
					<div
						onClick={this.props.show}
						className='close'
					>
						Fermer
					</div>}
				<br />
				<input
					className='blue'
					style={{color: '#d9d9d9'}}
					type='text'
					placeholder='Rechercher une autre gare'
					ref={inputEl => (this.searchInput = inputEl)}
					onChange={this.handleChange}
					onKeyDown={this.handleKey}
					autoComplete='off'
				/>
				{
					this.state.load && <div>
						<div className='progress-bck'></div>
						<div className='progress indeterminate'></div>
					</div>
				}
				<br />
				<div className='stopList'>

					{this.state.stops.map((stop, i) => (
						<GuiStop
							key={i}
							stop={stop}
							onover={i === this.state.curent ? true : false}
							auth={this.props.auth}
							opt={this.state.opt}
							show={this.props.show}
						/>
					))}
					{this.state.stops.length === 0 && <div className='center'>Aucun résultat</div>}

					<div className='about'>
						<br />
						<div className='hr'></div>
						<br />
						<img src={logo} className='logo' alt='Logo MyLines Embed' />
						<br />
						<span>
							MyLines 2021 - {new Date().getFullYear()} • Version 1.5.1 • {window.location.href.indexOf('mylines.fr/embed') >= 0 ? <> Train-Empire</> : <> SNCF</>}
							<br />
							Made with 💖
						</span>
						<br />
						
						<a className='mini_btn' href='https://github.com/MaisClement/MyLinesEmbed'>
							<img className='svg_white' src={github} alt='github' />
						</a>
						<a className='mini_btn' href='http://discord.mylines.fr'>
							<img className='svg_white' src={discord} alt='discord' />
						</a>
						<a className='mini_btn' href='mailto:clementf78@gmail.com'>
							<img className='svg_white' src={mail} alt='mail' />
						</a>

					</div>
				</div>
			</div>

			<div className='gui-menu'>
				<div className='hr'></div>
				<h3>Style d’affichage</h3>

				<div className='cc-selector'>
					<input type='radio' defaultChecked={this.opt(opt, 'SNCF/departure')} id='SNCFd' name='select' value='SNCF/departure' onClick={this.handleOpt} />
					<label className='selectcard-cc SNCFd-card' htmlFor='SNCFd'></label>
					<input type='radio' defaultChecked={this.opt(opt, 'SNCF/arrival')} id='SNCFa' name='select' value='SNCF/arrival' onClick={this.handleOpt} />
					<label className='selectcard-cc SNCFa-card' htmlFor='SNCFa'></label>
					<br /><br />
					<input type='radio' defaultChecked={this.opt(opt, 'IENA/departure')} id='IENAd' name='select' value='IENA/departure' onClick={this.handleOpt} />
					<label className='selectcard-cc IENAd-card' htmlFor='IENAd'></label>
					<input type='radio' defaultChecked={this.opt(opt, 'IENA/arrival')} id='IENAa' name='select' value='IENA/arrival' onClick={this.handleOpt} />
					<label className='selectcard-cc IENAa-card' htmlFor='IENAa'></label>
					<br /><br />
					<input type='radio' defaultChecked={this.opt(opt, 'RENFE/departure')} id='RENFEd' name='select' value='RENFE/departure' onClick={this.handleOpt} />
					<label className='selectcard-cc RENFEd-card' htmlFor='RENFEd'></label>
					<input type='radio' defaultChecked={this.opt(opt, 'RENFE/arrival')} id='RENFEa' name='select' value='RENFE/arrival' onClick={this.handleOpt} />
					<label className='selectcard-cc RENFEa-card' htmlFor='RENFEa'></label>
					<br /><br />
					<input type='radio' defaultChecked={this.opt(opt, 'TALOS/departure')} id='TALOSd' name='select' value='TALOS/departure' onClick={this.handleOpt} />
					<label className='selectcard-cc TALOSd-card' htmlFor='TALOSd'></label>
					<input type='radio' defaultChecked={this.opt(opt, 'TALOS/arrival')} id='TALOSa' name='select' value='TALOS/arrival' onClick={this.handleOpt} />
					<label className='selectcard-cc TALOSa-card' htmlFor='TALOSa'></label>
				</div>

			</div>

			<div className='gui-back' onClick={this.props.show}> </div>
		</>;
	}
}

class GuiStop extends React.Component {
	render() {
		let stop = this.props.stop;
		let name = stop.stop_point.name;
		let id = stop.stop_point.uic_code;
		let onover = this.props.onover;

		let url;
		if (window.location.href.indexOf('mylines.fr/embed') >= 0)
			url = '/embed/' + this.props.opt + '/' + id + '/' + this.props.auth + '?gui';
		else
			url = '/' + this.props.opt + '/' + id + '?gui';

		return <Link to={url} className={onover === true ? 'overmouse2' : 'overmouse'} onClick={this.props.show}>
			<div>
				{name}
			</div>
		</Link>;
	}
}

class GuiShow extends React.Component {
	render() {
		return <div className='gui-show' onClick={this.props.show}>
			<span className='bigger'> Options disponible en appuyant sur la gauche </span>
		</div>;
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

	componentDidMount() {
		if (typeof this.props.display !== 'undefined' && this.props.display === true)
			this.setState({
				show: true,
				displayForce: true
			});
	}

	show() {
		if (this.state.displayForce === false)
			this.setState({
				show: (!this.state.show)
			});
	}

	render() {
		return <>
			{!this.state.displayForce && <GuiShow show={this.show} opt={this.props.opt} gare={this.props.gare} />}
			{this.state.show && <GuiSearch show={this.show} opt={this.props.opt} displayForce={this.state.displayForce} auth={this.props.auth} />}
		</>;
	}
}

export default Gui;