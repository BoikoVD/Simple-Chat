import { useSelector, useDispatch } from 'react-redux';
import { openModalAC } from '../../../../store/modalReducer';
import cl from './ChatBody.module.scss';
import cn from 'classnames';
import MessageList from './MessageList/MessageList';
import SendMessageForm from './SendMessageForm/SendMessageForm';
import InfoButton from '../../../UI/InfoButton/InfoButton';
import Burger from '../../../UI/Burger/Burger';


function ChatBody({ inChatNav, setInChatNav }) {
	const activeRoom = useSelector(state => state.rooms.activeRoom);
	const dispatch = useDispatch();

	const clickOnRoomInfoButton = () => {
		dispatch(openModalAC('roomInfo'));
	}

	const clickOnBody = () => {
		if (inChatNav) {
			setInChatNav(false);
		}
	}
	const clickOnBurger = () => {
		if (!inChatNav) {
			setInChatNav(true);
		}
	}

	//console.log('Render: ChatBody');

	return (
		<div className={cn(cl.chatBody, {
			[cl.chatBodyDisabled]: inChatNav
		})} onClick={clickOnBody}>
			<div className={cl.chatHeaderWrapper}>
				<Burger onClick={clickOnBurger} />
				<div className={!activeRoom._id ? [cl.chatHeader, cl.none].join(' ') : cl.chatHeader}>
					<div className={cl.chatHeaderText}>
						<div className={cl.chatRoomName}>
							<span>{activeRoom.roomName}</span>
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