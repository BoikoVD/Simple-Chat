import React from 'react';
import { useSelector } from 'react-redux';
import Room from './Room/Room';
import cl from './RoomList.module.scss';

function RoomList() {
	const rooms = useSelector(state => state.rooms.rooms);


	const isEmpty = () => {
		for (let room of rooms) {
			return false;
		}
		return true;
	}
	//console.log('Render: RoomList');

	return (
		<div className={cl.roomList}>
			{isEmpty() ? '' : rooms.map(room => {
				return <Room room={room} key={room._id}>{room.roomName}</Room>
			})}
		</div>
	);
}

export default RoomList;