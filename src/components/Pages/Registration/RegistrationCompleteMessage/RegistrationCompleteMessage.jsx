import React from 'react';
import { useNavigate } from 'react-router-dom';
import cl from './RegistrationCompleteMessage.module.scss';
import Button from '../../../UI/Button/Button';

const RegistrationCompleteMessage = () => {
	const navigate = useNavigate();

	const clickAction = () => {
		navigate('/');
	}

	console.log('Render: RegistrationCompleteMessage');

	return (
		<div className={cl.message}>
			<div className={cl.messageText}>Registration complete</div>
			<Button onClick={clickAction}>Go to the LogIn page</Button>
		</div>
	);
}

export default RegistrationCompleteMessage;