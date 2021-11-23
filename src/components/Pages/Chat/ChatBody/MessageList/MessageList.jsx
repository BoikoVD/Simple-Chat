import React from 'react';
import cl from './MessageList.module.scss';
import { useSelector } from 'react-redux';
import Message from './Message/Message';

function MessageList(props) {
	const currentUser = useSelector(state => state.user.userData);
	const messages = useSelector(state => state.messages.messages);
	const messagesRef = React.useRef();

	React.useEffect(() => {
		messagesRef.current.scrollTo(0, 999999);
	}, [messages]);

	//console.log('Render: MessageList');

	return (
		<div className={cl.messageList} ref={messagesRef} {...props}>
			{messages.map((message, index) => {
				return <Message key={'key' + message.message + message.nickname + index} message={message} currentUserId={currentUser._id} />
			})}
		</div>
	);
}

export default MessageList;