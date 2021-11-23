import React from 'react';
import { BrowserRouter } from "react-router-dom";
import { useDispatch } from 'react-redux';
import api from '../http';
import { authorizationAction } from '../store/userReducer';
import cl from './App.module.scss';
import AppRouter from './AppRouter';
import LoadingModal from './UI/LoadingModal/LoadingModal';
import { updateRoomsAction } from '../store/roomsReducer';
import socket from '../socket/socket'
import { getMessagesAC, newMessageAC } from '../store/messagesReducer';

function App() {
	const [isLoading, setIsLoading] = React.useState(false);
	const dispatch = useDispatch();

	React.useEffect(() => {
		setIsLoading(true);
		setTimeout(async () => {
			await api.get('/check').then((res) => {
				//console.log(res);
				if (res.data.message === "User is logined") {
					dispatch(authorizationAction(true, res.data.data.user));
					dispatch(updateRoomsAction(res.data.data.rooms));
				} else {
					//dispatch(authorizationAction(false, res.data.data.user));
					//dispatch(updateRoomsAction(res.data.data.rooms));
				}
			});
			setIsLoading(false);
		}, 500);

		socket.on('SERVER:NEW_MESSAGE', ({ message }) => {
			//console.log(message);
			dispatch(newMessageAC(message));
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
