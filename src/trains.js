import React from 'react';
import { useParams } from 'react-router-dom';

import Error from './error';
import SNCF from './SNCF'
import IENA from './IENA'

class Trains extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
            width: window.innerWidth,
			height: window.innerHeight,

            showInfo: true,
            uic_code: 0,

            trains: [],
            
            error: '',
            error_message: '',
        };
        this.getTrain();

        this.handleResize = this.handleResize.bind(this);
	}

	handleResize(e){
		this.setState({
			width: window.innerWidth,
			height: window.innerHeight,
		});
	};

	componentDidMount() {
		this.timerID = setInterval(
			() => this.getTrain(),
			55000
		);
        this.timerTick = setInterval(
            () => this.tick(),
            3000
        );

        window.addEventListener("resize", this.handleResize);
	}
	
	componentWillUnmount() {
		clearInterval(this.timerID);
        clearInterval(this.timerTick);

        window.addEventListener("resize", this.handleResize);
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
        let count = 7;
        let url = '';
        if (this.props.auth)
            url = 'https://api.mylines.fr/te/' + this.props.type + '.php?stop=' + stop + '&auth=' + this.props.auth + '&count=' + count;
        else
            url = 'https://api.mylines.fr/sncf/' + this.props.type + '.php?stop=' + stop + '&count=' + count;
        
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
                    error: data.error,
                    error_message: data.error_message,
                }); 
            } 
            this.setState({
                trains: data.trains,
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
        let gare = '';
        if (typeof this.state.trains !== 'undefined' && typeof this.state.trains[0] !== 'undefined' )
            gare = this.state.trains[0].informations.stop_point;

        if (this.state.error != 0 || this.state.error != ''){
            return (
                <Error
                    type = {0}
                    error = {this.state.error}
                    error_message = {this.state.error_message}
                />
            );
        } else if (this.props.opt.indexOf ('SNCF') >= 0){
            return (
                <SNCF
                    trains = {this.state.trains}
                    type = {this.props.type}
                    arr={this.props.arr} 
                    opt = {this.props.opt}
                    gare = {gare}
                    showInfo = {this.state.showInfo}
                />
            );
        } else {
            return (
                <IENA
                    trains = {this.state.trains}
                    type = {this.props.type}
                    arr={this.props.arr} 
                    opt = {this.props.opt}
                    gare = {gare}
                    showInfo = {this.state.showInfo}
                />
            );
        }
	}
}

function SNCFd() {
    let params = useParams();
    return (
        <Trains 
            stop = {params.stop} 
            auth = {params.auth}
            arr = {'départs'} 
            type = {'departure'}
            opt = {'SNCF/departure'}
        />
    );
} 
function SNCFa() {
    let params = useParams();
    return (
        <Trains
            stop = {params.stop} 
            auth = {params.auth}
            arr = {'arrivées'} 
            type = {'arrival'}
            opt = {'SNCF/arrival'}
        />
    );
} 

function IENAd() {
    let params = useParams();
    return (
        <Trains 
            stop = {params.stop} 
            auth = {params.auth}
            arr = {'départs'} 
            type = {'departure'}
            opt = {'IENA/departure'}
        />
    );
} 
function IENAa() {
    let params = useParams();
    return (
        <Trains
            stop = {params.stop} 
            auth = {params.auth}
            arr = {'arrivées'} 
            type = {'arrival'}
            opt = {'IENA/arrival'}
        />
    );
} 

export default SNCFd;
export { SNCFa, IENAa, IENAd }