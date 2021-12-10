import React from 'react';
import { useSelector } from 'react-redux';
import cl from './FormButton.module.scss';

const FormButton = ({ children, ...props }) => {
	const isLoading = useSelector(state => state.form.isLoading);

	return (
		<button
			className={cl.myBtn}
			disabled={isLoading}
			{...props}
		>
			{isLoading ? '...' : children}
		</button>
	);
}

export default FormButton;