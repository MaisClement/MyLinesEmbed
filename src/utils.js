function createDate(date) {
	const year = date.substring(0, 4);
	const month = date.substring(4, 6);
	const day = date.substring(6, 8);
	const hour = date.substring(9, 11);
	const minute = date.substring(11, 13);
	const second = date.substring(13, 15);

	return new Date(year, month - 1, day, hour, minute, second);
}

function formatTime(value) {
	return value.toString().padStart(2, '0');
}

function getService(network, auth = null) {
	if (auth) {
		return `https://mylines.fr/embed?serv=${network}&auth=${auth}`;
	}
	return `https://mylines.fr/embed?serv=${network}`;
}

export { createDate, formatTime, getService };