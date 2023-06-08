import SNCF from './components/SNCF';
import IENA from './components/IENA';
import TALOS from './components/TALOS';

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
		'id': 'TALOS',
		'component': TALOS,
	}
];

export { routes };