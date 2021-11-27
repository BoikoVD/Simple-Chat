import React from 'react';
import cl from './FormButton.module.scss';

const FormButton = ({ children, ...props }) => {

	console.log('Render: FormButton');

	return (
		<button className={cl.myBtn} {...props}>
			{children}
		</button>
	);
}

export default FormButton;