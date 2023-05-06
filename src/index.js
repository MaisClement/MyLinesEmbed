import React from 'react';
import ReactDOM from 'react-dom';

import {
	BrowserRouter,
	Routes,
	Route
} from 'react-router-dom';

import SNCFd, { SNCFa, IENAa, IENAd, RENFEa, RENFEd, TALOSa, TALOSd } from './trains';
import Doc_S from './doc_s';
import Doc_T from './doc_t';
import Home, { Home_T } from './home';
import Error from './error';

class ErrorBoundary extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			hasError: false
		};
	}

	componentDidCatch() {
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

					{window.location.href.indexOf('mylines.fr/embed') >= 0 ?
						<>
							<Route path='/embed/SNCF/departure/:stop/:auth' element={<SNCFd />} />
							<Route path='/embed/SNCF/arrival/:stop/:auth' element={<SNCFa />} />

							<Route path='/embed/IENA/departure/:stop/:auth' element={<IENAd />} />
							<Route path='/embed/IENA/arrival/:stop/:auth' element={<IENAa />} />

							<Route path='/embed/RENFE/departure/:stop/:auth' element={<RENFEd />} />
							<Route path='/embed/RENFE/arrival/:stop/:auth' element={<RENFEa />} />

							<Route path='/embed/TALOS/departure/:stop/:auth' element={<TALOSd />} />
							<Route path='/embed/TALOS/arrival/:stop/:auth' element={<TALOSa />} />

							<Route path='/embed/doc' element={<Doc_T />} />

							<Route path='/embed/:auth' element={<Home />} />
							<Route path='*' element={<Home_T />} />
						</>
						:
						<>
							<Route path='/SNCF/departure/:stop' element={<SNCFd />} />
							<Route path='/SNCF/arrival/:stop' element={<SNCFa />} />

							<Route path='/IENA/departure/:stop' element={<IENAd />} />
							<Route path='/IENA/arrival/:stop' element={<IENAa />} />

							<Route path='/RENFE/departure/:stop' element={<RENFEd />} />
							<Route path='/RENFE/arrival/:stop' element={<RENFEa />} />

							<Route path='/TALOS/departure/:stop' element={<TALOSd />} />
							<Route path='/TALOS/arrival/:stop' element={<TALOSa />} />

							<Route path='/doc' element={<Doc_S />} />

							<Route path='*' element={<Home />} />
						</>
					}
				</Routes>
			</ErrorBoundary>
		</BrowserRouter>
	</React.StrictMode>,
	document.getElementById('root')
);

// https://jsfiddle.net/La8wQ/313/
// Animation par animista