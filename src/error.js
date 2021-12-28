import React from 'react';

import './main.css';
import logo from './image/Logo.png';

class Error extends React.Component  {
    render (){
        if (this.props.type == 404){
            return( <Error404/> )
        
        } else {
            return( 
                <ErrorDef
                    error = {this.props.error}
                    error_message = {this.props.error_message}
                /> 
            )
        }
    }
}

class Error404 extends React.Component  {
    render(){
        return (
            <div className="error">
                <div className="error2">
                    <div class="glitch" data-text="404 - Not Found !">404 - Not Found !</div>
                        <br/>
                    Malheureusement, la page que vous demandez n’existe pas ou plus. <br/>
                    Vérifiez l'url saisie et si besoin, contactez l'administration. <br/>

                        <br/><br/>
                
                </div>
                <div class="column">
                    <img src={logo} className="logo" />
                        <br/>
                    <span>
                        MyLines 2020 - 2021 • Version 1.0.0 <br/>
                        Made with 💖
                    </span>
                </div>
            </div>
        );
    }
}

class ErrorDef extends React.Component  {
    render(){
        return (
            <div className="error">
                <div className="error2">
                    <div class="glitch" data-text={this.props.error}>{this.props.error}</div>
                        <br/>
                    {this.props.error_message}<br/>
                    Reesayer dans quelques minutes et vérifiez l'url saisie. Si besoin, contactez l'administration. <br/>

                        <br/><br/>
                
                </div>
                <div class="column">
                    <img src={logo} className="logo" />
                        <br/>
                    <span>
                        MyLines 2020 - 2021 • Version 1.0.0 <br/>
                        Made with 💖
                    </span>
                </div>
            </div>
        );
    }
}

export default Error;