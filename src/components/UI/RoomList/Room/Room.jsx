import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setActiveRoomAction } from '../../../../store/roomsReducer';
import cl from './Room.module.scss';
import socket from '../../../../socket/socket'

function Room({ children, room, ...props }) {
	const activeRoom = useSelector(state => state.rooms.activeRoom);
	const dispatch = useDispatch();

	const onClick = () => {
		dispatch(setActiveRoomAction(room))
		socket.emit('JOIN', { roomId: room._id, prevRoom: activeRoom._id });
	}

	//console.log('Render: Room');

	return (
		<button
			className={activeRoom._id === room._id ? [cl.room, cl.active].join(' ') : cl.room}
			onClick={onClick}
			disabled={activeRoom._id === room._id}
			{...props}
		>{children}</button>
	);
}

export default Room;