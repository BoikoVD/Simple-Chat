import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setErrorAC } from '../../../store/formReducer';
import cl from './Textarea.module.scss';

function Textarea({ value, onChange, name, ...props }) {
	const error = useSelector(state => state.form.error);
	const dispatch = useDispatch();

	const change = (value) => {
		if (error.param === name && error.param) {
			dispatch(setErrorAC({}));
		}
		onChange(value);
	}

	return (
		<textarea
			value={value}
			onChange={e => change(e.target.value)}
			name={name}
			className={name === error.param ? [cl.textarea, cl.invalid].join(' ') : cl.textarea}
			{...props}
		></textarea>
	);
}

export default Textarea;