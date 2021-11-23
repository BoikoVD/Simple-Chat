import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Button from '../../../../UI/Button/Button';
import Textarea from '../../../../UI/Textarea/Textarea';
import cl from './SendMessageForm.module.scss';
import socket from '../../../../../socket/socket'
import { newMessageAC } from '../../../../../store/messagesReducer';

function SendMessageForm({ roomId }) {
	const [messageValue, setMessageValue] = React.useState('');
	const userData = useSelector(state => state.user.userData);
	const dispatch = useDispatch();

	const clickOnSendMessage = (e) => {
		e.preventDefault();
		const message = { userId: userData._id, nickname: userData.nickname, message: messageValue }
		socket.emit('NEW_MESSAGE', { roomId, message });
		dispatch(newMessageAC(message));
		setMessageValue('');
	}

	//console.log('Render: SendMessageForm');

	return (
		<form className={cl.sendMessageForm}>
			<Textarea
				rows="3"
				value={messageValue}
				onChange={e => setMessageValue(e.target.value)}
				disabled={!roomId}
			/>
			<Button onClick={clickOnSendMessage} disabled={!roomId}>Send</Button>
		</form>
	);
}

export default SendMessageForm;