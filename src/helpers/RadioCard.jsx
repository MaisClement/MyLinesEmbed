import React from 'react';

const RadioCard = ({ children, onChange, value, ...props }) => {
	const handleOnChange = (event) => {
		if (onChange) {
			onChange(event.target.value);
		}
	};
	
	return <>
		<style>
			{`
			input:active+.selectcard-cc {
				opacity: 0.9;
			}
			
			input:checked+.selectcard-cc {
				filter: none;
			}
			
			.selectcard-cc {
				cursor: pointer;
				background-size: contain;
				background-repeat: no-repeat;
				display: inline-block;
				margin-left: 20px;
				border-radius: 5px;
				transition: all 250ms ease;
				filter: brightness(1.2) grayscale(1) opacity(1);
			}
			
			.cc-selector input {
				display: none;
				margin: 0;
				padding: 0;
			}
			
			.selectcard-cc:hover {
				filter: brightness(1.2) grayscale(.5) opacity(1);
			}
			`}
		</style>
		<form className='cc-selector' onChange={handleOnChange} value={value} {...props}>
			{children}
		</form>
	</>;
};

export default RadioCard;