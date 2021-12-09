import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setActiveRoomAС } from '../../../../../../store/roomsReducer';
import cl from './Room.module.scss';

function Room({ room, inChatNav, setInChatNav, ...props }) {
	const activeRoom = useSelector(state => state.rooms.activeRoom);
	const dispatch = useDispatch();

	const clickOnRoom = () => {
		localStorage.setItem('roomId', room._id);
		dispatch(setActiveRoomAС(room));
		if (inChatNav) {
			setInChatNav(false)
		}
	}

	console.log('Render: Room');

	return (
		<button
			className={activeRoom._id === room._id ? [cl.room, cl.active].join(' ') : cl.room}

			onClick={clickOnRoom}
			{...props}
		>
			<div className={cl.roomName}>{room.roomName}</div>
			{room.messages.length === 0 ? null :
				<div className={cl.lastMessage}>
					<div className={cl.lastMessageNickname}>
						{room.messages[room.messages.length - 1].nickname}:
					</div>
					<div className={cl.lastMessageText}>
						{room.messages[room.messages.length - 1].message}
					</div>
				</div>
			}
		</button>
	);
}

export default Room;