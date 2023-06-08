import React from 'react';

const Card = ({ value, name, id, img }) => {
	const style = () => {
		return {
			backgroundImage: `url("${img}")`
		};
	};

	return <>
		<input type='radio' id={id ?? value} name={name} value={value} />
		<label className='selectcard-cc' style={style()} htmlFor={id ?? value} />
	</>;
};

export default Card;