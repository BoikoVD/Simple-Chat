import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import cl from './SendMessageForm.module.scss';
import { newMessageAC } from '../../../../../store/roomsReducer';
import { setErrorAC } from '../../../../../store/formReducer';
import socket from '../../../../../socket/socket'
import Textarea from '../../../../UI/Textarea/Textarea';
import Button from '../../../../UI/Button/Button';
import FormErrorHelp from '../../../../UI/Form/FormErrorHelp/FormErrorHelp';

function SendMessageForm({ roomId }) {
	const [messageValue, setMessageValue] = React.useState('');
	const userData = useSelector(state => state.user.userData);
	const dispatch = useDispatch();

	const sendMessage = (e) => {
		e.preventDefault();
		if (messageValue) {
			const message = { userId: userData._id, nickname: userData.nickname, message: messageValue }
			socket.emit('NEW_MESSAGE', { roomId, message });
			dispatch(newMessageAC(roomId, message));
			setMessageValue('');
		} else {
			dispatch(setErrorAC({ msg: "Please, enter your message", param: "message" }));
		}
	}

	const pressEnter = (e) => {
		if (e.code === 'Enter') {
			if (!messageValue) {
				e.preventDefault();
				dispatch(setErrorAC({ msg: "Please, enter your message", param: "message" }));
			} else {
				e.preventDefault();
				sendMessage(e);
			}
		}
	}

	return (
		<div className={cl.sendMessageFormWrapper}>
			<form className={!roomId ? [cl.sendMessageForm, cl.none].join(' ') : cl.sendMessageForm}>
				<Textarea
					value={messageValue}
					onChange={setMessageValue}
					name='message'
					rows="3"
					onKeyUp={(e) => { e.preventDefault() }}
					onKeyDown={pressEnter}
					aria-label='enter your message'
				/>
				<Button onClick={sendMessage}>Send</Button>
				<FormErrorHelp />
			</form>
		</div>
	);
}

export default SendMessageForm;