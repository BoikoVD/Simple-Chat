import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setErrorAC } from '../../../../store/formReducer';
import cl from './FormTextarea.module.scss';

function FormTextarea({ name, ...props }) {
	const [value, setValue] = React.useState('');
	const error = useSelector(state => state.form.error);
	const dispatch = useDispatch();

	const change = (value) => {
		if (name === error.param && error.param) {
			dispatch(setErrorAC({}));
		}
		setValue(value);
	}

	return (
		<textarea
			className={name === error.param ? [cl.textarea, cl.invalid].join(' ') : cl.textarea}
			value={value}
			onChange={e => change(e.target.value)}
			name={name}
			{...props}
		></textarea>
	);
}

export default FormTextarea;