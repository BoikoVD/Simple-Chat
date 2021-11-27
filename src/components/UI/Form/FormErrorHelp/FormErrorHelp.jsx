import React from 'react';
import cl from './FormErrorHelp.module.scss';
import icon from '../../../../assets/img/icons/error-icon.png';

function FormErrorHelp({ errorMsg }) {
	const [errorText, setErrorText] = React.useState('');

	React.useEffect(() => {
		if (errorMsg) {
			setErrorText(errorMsg);
		}
	}, [errorMsg])

	console.log('Render: FormErrorHelp');

	return (
		<div className={errorMsg ? [cl.errorHelpWrapper, cl.active].join(' ') : cl.errorHelpWrapper}>
			<div className={cl.errorHelp}>
				<img src={icon} alt="" />
				{errorText}
			</div>
		</div>
	);
}

export default FormErrorHelp;
