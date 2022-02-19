import React from 'react';
import { Link } from "react-router-dom";

import './assets/error/win.css';
import win_error from './assets/error/win_error.png';

import './assets/css/main.css';
import logo from './assets/img/Logo.png';

class Error extends React.Component  {
    render (){
        return (
            <div className="desktop">
                <div className="windows">
                    <div className="title">
                        <span>{this.props.error}</span>
                        <div className="close"><div className="button">×</div></div>
                    </div>

                    <table className="content">
                        <tbody>
                            <tr>
                                <td>
                                    <img src={win_error} />
                                </td>
                                <td className="details">
                                    {this.props.error_message} <br />
                                    Réessayez dans quelques minutes et si besoin, contactez l'administration. <br />
                                </td>				
                            </tr>
                        </tbody>
                    </table>
                    <div className="content choose">
                        <Link to={'/'}>
                            <div className="button content auto">Retour à l'index</div>
                        </Link>
                        <div className="button content auto" onClick={() =>{window.location.reload();}}>Réessayez</div>
                    </div>
                </div>
                <div className="home">
                    <img src={logo} className="logo" alt="Logo MyLines Embed" />
                </div>
            </div>
        );
    }
}

export default Error;