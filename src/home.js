import React from 'react';

import './main.css';
import logo from './image/Logo.png';

class Home extends React.Component  {
    render(){
        return (
            <div className="error">
                <div class="column">
                    <img src={logo} className="logo" alt="Logo MyLines Embed" />
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

export default Home;