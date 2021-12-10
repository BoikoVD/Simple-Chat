import React from 'react';
import cl from './Button.module.scss';

const Button = ({ children, ...props }) => {

	return (
		<button className={cl.myBtn} {...props}>
			{children}
		</button>
	);
}

export default Button;