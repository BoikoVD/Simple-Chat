import React from 'react';
import cl from './ErrorModal.module.scss';

function ErrorModal({ error }) {

	console.log('Render: ErrorModal');

	return (
		<div className={error ? [cl.errorModalWrapper, cl.active].join(' ') : cl.errorModalWrapper}>
			<div className={cl.errorModal}>
				<img src="/img/icons/error-icon.png" alt="" />
				{error}
			</div>
		</div>
	);
}

export default ErrorModal;
