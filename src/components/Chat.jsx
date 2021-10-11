import React, { useRef } from 'react';
import socket from '../socket';
import './Chat.css';

function Chat({ users, messages, userName, roomId, onAddMessage }) {
	const [messageValue, setMessageValue] = React.useState('');
	const messagesRef = React.useRef(null);
	const messageRef = React.useRef();
	const messageWrapperRef = React.useRef();
	const menuIconRef = React.useRef();
	const userDataRef = React.useRef();



	const pressSendMessage = () => {
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

	const pressMenuIcon = React.useEffect(() => {
		menuIconRef.current.addEventListener("click", function (e) {
			menuIconRef.current.classList.toggle("_active");
			userDataRef.current.classList.toggle("_active");
		});
	}, []);

	React.useEffect(() => {
		messagesRef.current.scrollTo(0, 999999);
		for (let index of messagesRef.current.children) {
			if (index.firstChild.firstChild.innerText == userName) {
				index.classList.add("_this");
				index.firstChild.classList.add("_this");
			}
		}
		if (messageRef.current != undefined) {
			if (userName == messageRef.current.firstChild.innerText) {
				messageRef.current.classList.add("_this");
				messageWrapperRef.current.classList.add("_this");
			}
		}
	}, [messages]);

	return (
		<div className="chat">
			<div className="chat-users">
				<div className="room-id">
					Room: <b>{roomId}</b>
				</div>
				<div className="icon-menu" ref={menuIconRef} onClick={pressMenuIcon}>
					<span className="icon-menu-arrow"></span>
					<span className="icon-menu-arrow"></span>
					<span className="icon-menu-arrow"></span>
				</div>
				<div className="users-data" ref={userDataRef}>
					<div className="users-online">
						Online: ({users.length})
					</div>
					<ul className="users">
						{users.map((name, index) => (
							<li className="user" key={name + index}>{name}</li>
						))}
					</ul>
				</div>
			</div>
			<div className="chat-messages">
				<div className="messages" ref={messagesRef}>
					{
						messages.map((message, index) => (
							<div className="message-wrapper" ref={messageWrapperRef} key={index}>
								<div className="message" ref={messageRef}>
									<div className="message-user">
										<b>{message.userName}</b>
									</div>
									<div className="message-value">
										{message.text}
									</div>
								</div>
							</div>
						))
					}
				</div>
				<form className="form">
					<textarea className="form-textarea" rows="3" value={messageValue} onChange={(e) => setMessageValue(e.target.value)}></textarea>
					<button className="btn-send" type="button" onClick={pressSendMessage}><b>Send</b></button>
				</form>
			</div>
		</div>
	);
}

export default Chat;