import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import api from '../../../../http/index';
import cl from './RoomInfo.module.scss';
import { closeModalAC } from '../../../../store/modalReducer';
import Button from '../../Button/Button';
import { updateRoomsAC, setActiveRoomAС } from '../../../../store/roomsReducer';

const RoomInfo = () => {
	const [isLoading, setIsLoading] = React.useState(false);
	const userData = useSelector(state => state.user.userData);
	const activeRoom = useSelector(state => state.rooms.activeRoom);
	const dispatch = useDispatch();

	const clickOnLeave = async () => {
		setIsLoading(true);
		await api.post('/leaveroom', { roomId: activeRoom._id, userId: userData._id }).then((res) => {
			console.log(res.data.rooms);
			dispatch(setActiveRoomAС({}));
			dispatch(updateRoomsAC(res.data.rooms));
			dispatch(closeModalAC());
		})
		setIsLoading(false);
	}

	//console.log('Render: RoomInfo');

	return (
		<div className={cl.roomInfo}>
			<div className={cl.roomData}>
				<span>Name:</span> {activeRoom.roomName}
			</div>
			<div className={cl.roomData}>
				<span>Id:</span> {activeRoom._id}
			</div>
			<Button onClick={clickOnLeave} disabled={isLoading}>{isLoading ? '...' : 'Leave'}</Button>
		</div>
	);
}

export default RoomInfo;