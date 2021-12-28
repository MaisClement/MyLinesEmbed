import React from 'react';

import './main.css';
import logo from './image/Logo.png';

import Gui from './gui';

class Home extends React.Component  {
    render(){
        return (
            <div className="error">
                <Gui 
                    style = {'SNCF'}
                    type = {'departure'}
                    display = {true}
                />
                <div class="column">
                    <img src={logo} className="logo" alt="Logo MyLines Embed" />
                </div>
            </div>
        );
    }
}

export default Home;