import React from 'react';
import cl from './FindRoomForm.module.scss';
import { useSelector, useDispatch } from 'react-redux';
import api from '../../../../http/index';
import socket from '../../../../socket/socket';
import { closeModalAC } from '../../../../store/modalReducer';
import { updateRoomsAC } from '../../../../store/roomsReducer';
import FormInput from '../../Form/FormInput/FormInput';
import FormButton from '../../Form/FormButton/FormButton';
import FormErrorHelp from '../../Form/FormErrorHelp/FormErrorHelp';
import { setErrorAC, setIsLoadingAC } from '../../../../store/formReducer';

const FindRoomForm = () => {
	const userData = useSelector(state => state.user.userData);
	const dispatch = useDispatch();

	const submitForm = async (e) => {
		e.preventDefault();
		dispatch(setIsLoadingAC(true));
		const roomId = e.target.roomId.value;
		await api.post('/findroom', { roomId, userId: userData._id }).then((res) => {
			if (res.data.errors) {
				dispatch(setErrorAC(res.data.errors[0]));
			} else {
				dispatch(setErrorAC({}));
				socket.emit('JOIN_TO_ROOM', { roomId });
				dispatch(updateRoomsAC(res.data.rooms));
				dispatch(closeModalAC());
			}
			dispatch(setIsLoadingAC(false));
		});
	}

	return (
		<form className={cl.findRoomForm} onSubmit={submitForm}>
			<FormInput
				name="roomId"
				placeholder="Room's Id"
				type="text"
			/>
			<FormButton >Join</FormButton>
			<FormErrorHelp />
		</form>
	);
}

export default FindRoomForm;