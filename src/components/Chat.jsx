import React, { useRef } from 'react';
import socket from '../socket';
import './Chat.css';

function Chat({ users, messages, userName, roomId, onAddMessage }) {
	const [messageValue, setMessageValue] = React.useState('');
	const messagesRef = React.useRef(null);

	const onSendNessage = () => {
		socket.emit('ROOM:NEW_MESSAGE', {
			userName,
			roomId,
			text: messageValue,
		});
		onAddMessage({
			userName,
			text: messageValue,
		});
		setMessageValue('');
	};

	React.useEffect(() => {
		messagesRef.current.scrollTo(0, 999999);
	}, [messages]);

	return (
		<div className="chat">
			<div className="chat-users">
				<div className="room-id">
					Room: <b>{roomId}</b>
				</div>
				<div className="users-online">
					Online: ({users.length})
				</div>
				<ul className="users">
					{users.map((name, index) => (
						<li className="user" key={name + index}>{name}</li>
					))}
				</ul>
			</div>
			<div className="chat-messages">
				<div className="messages" ref={messagesRef}>
					{
						messages.map(message => (
							<div className="message">
								<div className="message-user">
									{message.userName}
								</div>
								<div className="message-value">
									{message.text}
								</div>
							</div>
						))
					}
				</div>
				<form className="form">
					<textarea className="form-textarea" rows="3" value={messageValue} onChange={(e) => setMessageValue(e.target.value)}></textarea>
					<button className="btn-send" type="button" onClick={onSendNessage}>Send</button>
				</form>
			</div>
		</div>
	);
}

export default Chat;