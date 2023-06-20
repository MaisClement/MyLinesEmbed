import React from 'react';

const Card = ({ content, value, name, id, img }) => {
	const style = () => {
		return {
			backgroundImage: `url("${img}")`
		};
	};

	return <>
		<input type='radio' id={id ?? content} name={name} value={content} checked={content == value} />
		<label className='selectcard-cc' style={style()} htmlFor={id ?? content} />
	</>;
};

export default Card;