import { useSelector, useDispatch } from 'react-redux';
import { openModalAC } from '../../../../store/modalReducer';
import AddRoomButton from '../../../UI/Modal/AddRoomButton/AddRoomButton';
import InfoButton from '../../../UI/InfoButton/InfoButton';
import RoomList from './RoomList/RoomList';
import cl from './ChatNavigation.module.scss';
import cn from 'classnames';

function ChatNavigation({ inChatNav, setInChatNav }) {
	const userData = useSelector(state => state.user.userData);
	const dispatch = useDispatch();

	const clicOnkAddRoom = () => {
		dispatch(openModalAC('addRoom'));
	}
	const clickOnInfoButton = () => {
		dispatch(openModalAC('userInfo'));
	}

	return (
		<div className={cn(cl.chatNav, {
			[cl.chatNavActive]: inChatNav
		})}>
			<div className={cl.userNickname}>
				<InfoButton onClick={clickOnInfoButton} color="white" aria-label='user information' />
				<span>{userData.nickname}</span>
			</div>
			<RoomList setInChatNav={setInChatNav} inChatNav={inChatNav} />
			<div className={cl.addRoomButton}>
				<AddRoomButton onClick={clicOnkAddRoom} />
			</div>
		</div>
	);
}

export default ChatNavigation;