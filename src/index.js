import React from 'react';
import ReactDOM from 'react-dom';
import Marquee from 'react-fast-marquee';

import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import './index.css';

import SNCFd from './SNCFd';
import SNCFa from './SNCFa';
import Home from './home';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/SNCF/departure/:stop" element={<SNCFd />} />
        <Route path="/SNCF/arrival/:stop" element={<SNCFa />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
