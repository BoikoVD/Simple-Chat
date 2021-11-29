import React from 'react';
import { useSelector } from 'react-redux';
import cl from './FormErrorHelp.module.scss';
import icon from '../../../../assets/img/icons/error-icon.png';

function FormErrorHelp() {
	const [errorText, setErrorText] = React.useState('');
	const error = useSelector(state => state.form.error);

	React.useEffect(() => {
		if (error.msg) {
			setErrorText(error.msg);
		}
	}, [error.msg])

	console.log('Render: FormErrorHelp');

	return (
		<div className={error.msg ? [cl.errorHelpWrapper, cl.active].join(' ') : cl.errorHelpWrapper}>
			<div className={cl.errorHelp}>
				<img src={icon} alt="" />
				{errorText}
			</div>
		</div>
	);
}

export default FormErrorHelp;
