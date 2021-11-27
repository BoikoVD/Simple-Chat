import React from 'react';
import cl from './FormInput.module.scss';

const FormInput = ({ setValue, setError, valueParam, errorParam, ...props }) => {

	const change = (value) => {
		if (valueParam === errorParam && errorParam) {
			setError({});
		}
		setValue(value)
	}

	console.log('Render: FormInput');

	return (
		<input
			className={valueParam === errorParam ? [cl.myInput, cl.invalid].join(' ') : cl.myInput}
			onChange={e => change(e.target.value)}
			{...props}
		/>
	);
}

export default FormInput;