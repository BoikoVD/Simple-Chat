import { useSelector } from 'react-redux';
import MessageList from './MessageList/MessageList';
import SendMessageForm from './SendMessageForm/SendMessageForm';
import cl from './ChatBody.module.scss';

function ChatBody() {
	const activeRoom = useSelector(state => state.rooms.activeRoom);

	//console.log('Render: ChatBody');

	return (
		<div className={cl.chatBody}>
			<div className={cl.chatHeader}>
				<div className={cl.chatRoomName}>{activeRoom.roomName}</div>
				<div className={cl.chatRoomId}><b>Id: </b>{activeRoom._id}</div>
			</div>
			<MessageList />
			<SendMessageForm roomId={activeRoom._id} />
		</div>
	);
}

export default ChatBody;