import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import cl from './CreateRoomForm.module.scss';
import api from '../../../../http/index';
import socket from '../../../../socket/socket';
import { closeModalAC } from '../../../../store/modalReducer';
import { updateRoomsAC } from '../../../../store/roomsReducer';
import FormInput from '../../Form/FormInput/FormInput';
import FormButton from '../../Form/FormButton/FormButton';
import FormErrorHelp from '../../Form/FormErrorHelp/FormErrorHelp';
import { setErrorAC, setIsLoadingAC } from '../../../../store/formReducer';

const CreateRoomForm = () => {
	const userData = useSelector(state => state.user.userData);
	const dispatch = useDispatch();

	const submitForm = async (e) => {
		e.preventDefault();
		dispatch(setIsLoadingAC(true));
		const roomName = e.target.roomName.value;
		await api.post('/createroom', { roomName, creatorId: userData._id }).then((res) => {
			if (res.data.errors) {
				dispatch(setErrorAC(res.data.errors[0]));
			} else {
				dispatch(setErrorAC({}));
				socket.emit('JOIN_TO_ROOM', { roomId: res.data.roomId });
				dispatch(updateRoomsAC(res.data.rooms));
				dispatch(closeModalAC());
			}
			dispatch(setIsLoadingAC(false));
		});
	}

	return (
		<form className={cl.createRoomForm} onSubmit={submitForm}>
			<FormInput
				name="roomName"
				placeholder="Room's name"
				type="text"
			/>
			<FormButton>Create</FormButton>
			<FormErrorHelp />
		</form>
	);
}

export default CreateRoomForm;