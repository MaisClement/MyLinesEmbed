import React from 'react';
import ReactDOM from 'react-dom';
import Marquee from 'react-fast-marquee';

import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import './assets/css/index.css';

import SNCFd, { SNCFa } from './SNCF';

import Home from './home';
import Error from './error';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      hasError: false 
    };
  }

  componentDidCatch(error, info) {
    this.setState({ 
      hasError: true
    });
  }

  render() {
    if (this.state.hasError == true) {
      return <Error error={'Erreur fatale'} error_message={'Quelque chose s\'est mal passé.'} />;
    } else {
      return this.props.children;
    }
  }
}

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <ErrorBoundary>
        <Routes>
          <Route path="/SNCF/departure/:stop" element={<SNCFd />} />
          <Route path="/SNCF/arrival/:stop" element={<SNCFa />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </ErrorBoundary>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// https://jsfiddle.net/La8wQ/313/
// Animation par animista