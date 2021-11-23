import React from 'react';
import cl from './Input.module.scss';

const Input = ({ paramType, errorParam, setError, value, ...props }) => {

	React.useEffect(() => {
		if (paramType === errorParam && errorParam) {
			setError({});
		}
	}, [value])

	console.log('Render: Input');

	return (
		<input
			className={paramType === errorParam ? [cl.myInput, cl.invalid].join(' ') : cl.myInput}
			{...props}
		/>
	);
}

export default Input;