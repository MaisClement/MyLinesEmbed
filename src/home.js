import React from 'react';

import './assets/css/main.css';
import logo from './assets/img/Logo.png';

import Gui from './gui';

class Home extends React.Component  {
    render(){
        return (
            <div className="error">
                <Gui 
                    style = {'SNCF'}
                    type = {'departure'}
                    display = {true}
                    opt = {'SNCF/departure'}
                />
                <div className="home">
                    <img src={logo} className="logo" alt="Logo MyLines Embed" />
                </div>
            </div>
        );
    }
}

export default Home;