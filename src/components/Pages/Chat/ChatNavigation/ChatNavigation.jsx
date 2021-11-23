import { useSelector, useDispatch } from 'react-redux';
import { onModalAction } from '../../../../store/modalReducer';
import AddRoomButton from '../../../UI/AddRoomButton/AddRoomButton';
import InfoButton from '../../../UI/InfoButton/InfoButton';
import RoomList from '../../../UI/RoomList/RoomList';
import cl from './ChatNavigation.module.scss';

function ChatNavigation() {
	const userData = useSelector(state => state.user.userData);
	const dispatch = useDispatch();

	const onClickAddRoom = () => {
		dispatch(onModalAction(true, 'addRoom'));
	}
	const onClickInfoButton = () => {
		dispatch(onModalAction(true, 'userInfo'));
	}

	//console.log('Render: ChatNavigation');

	return (
		<div className={cl.chatNav}>
			<div className={cl.userNickname}>
				<InfoButton onClick={onClickInfoButton} />
				{userData.nickname}
			</div>
			<RoomList />
			<div className={cl.addRoomButton}>
				<AddRoomButton onClick={onClickAddRoom} />
			</div>
		</div>
	);
}

export default ChatNavigation;