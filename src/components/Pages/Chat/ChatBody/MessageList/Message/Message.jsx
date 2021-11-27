import React from 'react';
import cl from './Message.module.scss';

function Message({ message, currentUserId, ...props }) {

	console.log('Render: Message');

	return (
		<div className={cl.wrapper} {...props}>
			<div className={message.userId === currentUserId ? [cl.message, cl.currentMessage].join(' ') : cl.message}>
				<div className={cl.nickname}>
					{message.nickname}
				</div>
				<div className={message.userId === currentUserId ? [cl.text, cl.currentText].join(' ') : cl.text}>
					{message.message}
				</div>
			</div>
		</div >
	);
}

export default Message;