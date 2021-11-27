import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import cl from './SendMessageForm.module.scss';
import { newMessageAC } from '../../../../../store/roomsReducer';
import socket from '../../../../../socket/socket'
import FormTextarea from '../../../../UI/Form/FormTextarea/FormTextarea';
import FormButton from '../../../../UI/Form/FormButton/FormButton';
import FormErrorHelp from '../../../../UI/Form/FormErrorHelp/FormErrorHelp';

function SendMessageForm({ roomId }) {
	const [messageValue, setMessageValue] = React.useState('');
	const [error, setError] = React.useState({});
	const userData = useSelector(state => state.user.userData);
	const dispatch = useDispatch();

	const clickOnSendMessage = (e) => {
		e.preventDefault();
		if (messageValue) {
			const message = { userId: userData._id, nickname: userData.nickname, message: messageValue }
			socket.emit('NEW_MESSAGE', { roomId, message });
			dispatch(newMessageAC(roomId, message));
			setMessageValue('');
		} else {
			setError({ msg: "Please, enter your message", param: "message" });
		}
	}

	console.log('Render: SendMessageForm');

	return (
		<div className={cl.sendMessageFormWrapper}>
			<form className={!roomId ? [cl.sendMessageForm, cl.none].join(' ') : cl.sendMessageForm}>
				<FormTextarea
					value={messageValue}
					setValue={setMessageValue}
					setError={setError}
					valueParam="message"
					errorParam={error.param}
					rows="3"
				/>
				<FormButton onClick={clickOnSendMessage}>Send</FormButton>
				<FormErrorHelp errorMsg={error.msg} />
			</form>
		</div>
	);
}

export default SendMessageForm;