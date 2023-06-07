const wallpaper = (usr = '') => {
	return {
		background: `url(https://mylines.fr/image?serv=Wallpaper&company=${usr})`,
		backgroundPosition: 'center center',
		backgroundSize: 'cover'
	};
};

const Wallpaper = {
	background: 'url(https://mylines.fr/image?serv=Wallpaper) center center / cover',
	height: '100vh',
	left: 0,
	position: 'fixed',
	right: 0,
	top: 0,
	zIndex: '-1',
};

export { wallpaper, Wallpaper };
