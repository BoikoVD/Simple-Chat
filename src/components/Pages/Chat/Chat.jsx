import React from 'react';
import Modal from '../../UI/Modal/Modal';
import cl from './Chat.module.scss';
import ChatBody from "./ChatBody/ChatBody";
import ChatNavigation from "./ChatNavigation/ChatNavigation";

function Chat() {
	const [inChatNav, setInChatNav] = React.useState(true);

	//console.log('Render: Chat');

	return (
		<div className={cl.chat} >
			<ChatNavigation inChatNav={inChatNav} setInChatNav={setInChatNav} />
			<ChatBody inChatNav={inChatNav} setInChatNav={setInChatNav} />
			<Modal />
		</div>
	);
}

export default Chat;
