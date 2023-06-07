import React from 'react';
import { createRoot } from 'react-dom/client';

import App from './App';

import './assets/css/main.css';
import './assets/css/color.css';
import './assets/css/form.css';
import './assets/css/index.css';

// https://codepen.io/gaearon/pen/wqvxGa?editors=0010
class ErrorBoundary extends React.Component {
	constructor(props) {
		super(props);
		this.state = { error: null, errorInfo: null };
	}

	componentDidCatch(error, errorInfo) {
		this.setState({
			error: error,
			errorInfo: errorInfo
		});
	}

	render() {
		if (this.state.errorInfo) {
			return <div>
				<h2>Something went wrong.</h2>
				<details style={{ whiteSpace: 'pre-wrap' }}>
					{this.state.error && this.state.error.toString()}
					<br />
					{this.state.errorInfo.componentStack}
				</details>
			</div>;
		}
		return this.props.children;
	}
}

console.log('%cSTOP!', 'color:#f00;font-size:xxx-large');
console.log('%cNe saisissez ou ne copiez en AUCUN CAS du code que vous ne comprenez pas.', 'color:#f00;font-size:large');
console.log('%cCopier quelque chose ici peut permettre à un pirate de voler vos données voir, prendre contrôle de votre ordinateur à distance.', 'font-size:normal');
console.log('%cPour en savoir plus : https://en.wikipedia.org/wiki/Self-XSS', 'font-size:normal');

// After
const container = document.getElementById('root');
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(
	<React.StrictMode>
		<ErrorBoundary>
			<App />
		</ErrorBoundary>
	</React.StrictMode>
);