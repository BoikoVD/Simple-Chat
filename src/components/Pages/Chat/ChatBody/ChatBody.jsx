import { useSelector, useDispatch } from 'react-redux';
import { openModalAC } from '../../../../store/modalReducer';
import cl from './ChatBody.module.scss';
import MessageList from './MessageList/MessageList';
import SendMessageForm from './SendMessageForm/SendMessageForm';
import InfoButton from '../../../UI/InfoButton/InfoButton';


function ChatBody() {
	const activeRoom = useSelector(state => state.rooms.activeRoom);
	const dispatch = useDispatch();

	const clickOnRoomInfoButton = () => {
		dispatch(openModalAC('roomInfo'));
	}

	console.log('Render: ChatBody');

	return (
		<div className={cl.chatBody}>
			<div className={cl.chatHeaderWrapper}>
				<div className={!activeRoom._id ? [cl.chatHeader, cl.none].join(' ') : cl.chatHeader}>
					<div className={cl.chatHeaderText}>
						<div className={cl.chatRoomName}>
							{activeRoom.roomName}
						</div>
					</div>
					<InfoButton onClick={clickOnRoomInfoButton} color="black" />
				</div>
			</div>
			<MessageList />
			<SendMessageForm roomId={activeRoom._id} />
		</div>
	);
}

export default ChatBody;