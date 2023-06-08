import SNCF from './components/SNCF';
import IENA from './components/IENA';
import RENFE from './NotFound';
import TALOS from './components/TALOS';

// import SNCFa from './assets/img/SNCFa.png';
// import SNCFd from './assets/img/SNCFd.png';
// import TALOSa from './assets/img/TALOSa.png';
// import TALOSd from './assets/img/TALOSd.png';
// import IENAa from './assets/img/IENAa.png';
// import IENAd from './assets/img/IENAd.png';
// import RENFEa from './assets/img/RENFEa.png';
// import RENFEd from './assets/img/RENFEd.png';

const routes = [
	{
		'id': 'SNCF',
		'component': SNCF,
	},
	{
		'id': 'IENA',
		'component': IENA,
	},
	{
		'id': 'RENFE',
		'component': RENFE,
	},
	{
		'id': 'TALOS',
		'component': TALOS,
	}
];

export { routes };