import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../UI/Button/Button';
import cl from './NotFound.module.scss';

const NotFound = () => {
	const navigate = useNavigate();

	const clickAction = () => {
		navigate(-1);
	}

	console.log('Render: NotFound');

	return (
		<div className={cl.notFound}>
			<div className={cl.text}>404</div>
			<div className={cl.text}>Page not found</div>
			<Button onClick={clickAction}>Back</Button>
		</div>
	);
}

export default NotFound;