import React from 'react';
import { Link } from "react-router-dom";

import './assets/error/win.css';
import win_error from './assets/error/win_error.png';

class Error extends React.Component  {
    render (){
        return (
            <div class="desktop">
                <div class="windows">
                    <div class="title">
                        <span>{this.props.error}</span>
                        <div class="close"><div class="button">×</div></div>
                    </div>

                    <table class="content">
                        <tbody>
                            <tr>
                                <td>
                                    <img src={win_error} />
                                </td>
                                <td class="details">
                                    {this.props.error_message} <br />
                                    Réessayez dans quelques minutes et si besoin, contactez l'administration. <br />
                                </td>				
                            </tr>
                        </tbody>
                    </table>
                    <div class="content choose">
                        <a href="https://embed.mylines.fr/">
                            <div class="button content auto">Retour à l'index</div>
                        </a>
                    </div>
                </div>
            </div>
        );
    }
}

export default Error;