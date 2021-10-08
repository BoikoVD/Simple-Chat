import React from 'react';
import axios from 'axios';
//import socket from '../socket';

import './JoinBlock.css';

function JoinBlock({ goToChat }) {
	const [roomId, setRoomId] = React.useState('');
	const [userName, setUserName] = React.useState('');
	const [isLoading, setLoading] = React.useState(false);

	const pressJoinButton = async () => {
		if (!roomId && !userName) {
			return alert('Please, enter your data');
		}
		if (!roomId) {
			return alert('Please, enter room ID');
		}
		if (!userName) {
			return alert('Please, enter your name');
		}
		const obj = { roomId, userName };
		setLoading(true)
		console.log(roomId, userName);
		await axios.post('/rooms', obj);
		goToChat(obj);
	}

	return (
		<div className="join">
			<input className="join-input" type="text" placeholder="Room ID" value={roomId} onChange={(e) => setRoomId(e.target.value)} />
			<input className="join-input" type="text" placeholder="User Name" value={userName} onChange={(e) => setUserName(e.target.value)} />
			<button className="btn-join" onClick={pressJoinButton} disabled={isLoading}><b>{isLoading ? '...' : 'Join'}</b></button>
		</div>
	);
}

export default JoinBlock;

