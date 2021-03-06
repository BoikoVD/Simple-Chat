import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setActiveRoomAĞ¡ } from '../../../../../store/roomsReducer';
import Room from './Room/Room';
import cl from './RoomList.module.scss';

function RoomList({ setInChatNav, inChatNav }) {
	const rooms = useSelector(state => state.rooms.rooms);
	const dispatch = useDispatch();

	React.useEffect(() => {
		const activeRoomId = localStorage.getItem('roomId');
		if (activeRoomId) {
			for (let room of rooms) {
				if (activeRoomId === room._id) {
					dispatch(setActiveRoomAĞ¡(room))
				}
			}
		}
	}, [dispatch, rooms]);

	return (
		<div className={cl.roomList}>
			{rooms ? rooms.map(room => {
				return <div className={cl.room} key={room._id}><Room room={room} inChatNav={inChatNav} setInChatNav={setInChatNav} /></div>
			}) : null}
		</div>
	);
}

export default RoomList;