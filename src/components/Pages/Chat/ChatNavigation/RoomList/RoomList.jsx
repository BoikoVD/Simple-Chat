import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setActiveRoomAС } from '../../../../../store/roomsReducer';
import Room from './Room/Room';
import cl from './RoomList.module.scss';

function RoomList() {
	const rooms = useSelector(state => state.rooms.rooms);
	const dispatch = useDispatch();

	React.useEffect(() => {
		const activeRoomId = localStorage.getItem('roomId');
		if (activeRoomId) {
			for (let room of rooms) {
				if (activeRoomId === room._id) {
					dispatch(setActiveRoomAС(room))
				}
			}
		}
	}, [dispatch, rooms]);

	console.log('Render: RoomList');

	return (
		<div className={cl.roomList}>
			{rooms ? rooms.map(room => {
				return <div className={cl.room} key={room._id}><Room room={room} /></div>
			}) : null}
		</div>
	);
}

export default RoomList;