import Modal from '../../UI/Modal/Modal';
import cl from './Chat.module.scss';
import ChatBody from "./ChatBody/ChatBody";
import ChatNavigation from "./ChatNavigation/ChatNavigation";

function Chat() {

	//console.log('Render: Chat');

	return (
		<div className={cl.chat}>
			<ChatNavigation />
			<ChatBody />
			<Modal />
		</div>
	);
}

export default Chat;
