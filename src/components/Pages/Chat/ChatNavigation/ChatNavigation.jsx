import { useSelector, useDispatch } from 'react-redux';
import { openModalAC } from '../../../../store/modalReducer';
import AddRoomButton from '../../../UI/Modal/AddRoomButton/AddRoomButton';
import InfoButton from '../../../UI/InfoButton/InfoButton';
import RoomList from './RoomList/RoomList';
import cl from './ChatNavigation.module.scss';

function ChatNavigation() {
	const userData = useSelector(state => state.user.userData);
	const dispatch = useDispatch();

	const clicOnkAddRoom = () => {
		dispatch(openModalAC('addRoom'));
	}
	const clickOnInfoButton = () => {
		dispatch(openModalAC('userInfo'));
	}

	console.log('Render: ChatNavigation');

	return (
		<div className={cl.chatNav}>
			<div className={cl.userNickname}>
				<InfoButton onClick={clickOnInfoButton} color="white" />
				{userData.nickname}
			</div>
			<RoomList />
			<div className={cl.addRoomButton}>
				<AddRoomButton onClick={clicOnkAddRoom} />
			</div>
		</div>
	);
}

export default ChatNavigation;