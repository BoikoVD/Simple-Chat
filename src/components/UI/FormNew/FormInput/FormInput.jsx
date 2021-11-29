import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setErrorAC } from '../../../../store/formReducer';
import cl from './FormInput.module.scss';

const FormInput = ({ name, ...props }) => {
	const [value, setValue] = React.useState('');
	const error = useSelector(state => state.form.error);
	const dispatch = useDispatch();

	const valueParam = (name === "retPassword") ? "password" : name;

	const change = (value) => {
		if (valueParam === error.param && error.param) {
			dispatch(setErrorAC({}));
		}
		setValue(value)
	}

	console.log('Render: FormInput');

	return (
		<input
			className={valueParam === error.param ? [cl.myInput, cl.invalid].join(' ') : cl.myInput}
			value={value}
			onChange={e => change(e.target.value)}
			name={name}
			{...props}
		/>
	);
}

export default FormInput;