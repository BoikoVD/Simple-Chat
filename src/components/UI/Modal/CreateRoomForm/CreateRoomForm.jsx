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

const CreateRoomForm = () => {
	const [roomName, setRoomName] = React.useState('');
	const [isLoading, setIsLoading] = React.useState(false);
	const [error, setError] = React.useState({});
	const userData = useSelector(state => state.user.userData);
	const dispatch = useDispatch();

	const clickOnCreate = async (e) => {
		e.preventDefault();
		setIsLoading(true);
		await api.post('/createroom', { roomName, creatorId: userData._id }).then((res) => {
			if (res.data.errors) {
				setError(res.data.errors[0]);
			} else {
				setError({});
				socket.emit('JOIN_TO_ROOM', { roomId: res.data.roomId });
				dispatch(updateRoomsAC(res.data.rooms));
				dispatch(closeModalAC());
			}
			setIsLoading(false);
		});
	}

	console.log('Render: CreateRoomForm');

	return (
		<form className={cl.createRoomForm}>
			<FormInput
				value={roomName}
				setValue={setRoomName}
				setError={setError}
				valueParam="roomName"
				errorParam={error.param}
				placeholder="Room's name"
				type="text"
			/>
			<FormButton onClick={clickOnCreate} disabled={isLoading}>{isLoading ? '...' : 'Create'}</FormButton>
			<FormErrorHelp errorMsg={error.msg} />
		</form>
	);
}

export default CreateRoomForm;