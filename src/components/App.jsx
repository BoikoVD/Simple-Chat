import React from 'react';
import { BrowserRouter } from "react-router-dom";
import { useDispatch } from 'react-redux';
import api from '../http';
import socket from '../socket/socket'
import cl from './App.module.scss';
import { authAC } from '../store/authReducer';
import { updateUserDataAC } from '../store/userReducer';
import { newMessageAC, updateRoomsAC } from '../store/roomsReducer';
import { getMessagesAC } from '../store/messagesReducer';
import AppRouter from './Router/AppRouter';
import LoadingModal from './UI/LoadingModal/LoadingModal';

function App() {
	const [isLoading, setIsLoading] = React.useState(false);
	const dispatch = useDispatch();

	React.useEffect(() => {
		setIsLoading(true);
		setTimeout(async () => {
			await api.get('/check').then((res) => {
				if (res.data.statusCode) {
					socket.emit('JOIN', { rooms: res.data.rooms });
					dispatch(updateUserDataAC(res.data.user));
					dispatch(updateRoomsAC(res.data.rooms));
					dispatch(authAC(true));
				}
			});
			setIsLoading(false);
		}, 500);

		socket.on('SERVER:NEW_MESSAGE', ({ roomId, message }) => {
			//console.log(message);
			dispatch(newMessageAC(roomId, message));
		});
		socket.on('SERVER:GET_MESSAGES', ({ messages }) => {
			//console.log('Socket Messages ' + messages);
			dispatch(getMessagesAC(messages));
		});
	}, [])

	console.log('Render: App');

	return (
		<BrowserRouter>
			<div className={cl.wrapper}>
				{!isLoading ? <AppRouter /> : <LoadingModal />}
			</div>
		</BrowserRouter>
	);
}

export default App;
