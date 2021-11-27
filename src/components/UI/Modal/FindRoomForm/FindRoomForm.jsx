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

const FindRoomForm = () => {
	const [roomId, setRoomId] = React.useState('');
	const [isLoading, setIsLoading] = React.useState(false);
	const [error, setError] = React.useState({});
	const userData = useSelector(state => state.user.userData);
	const dispatch = useDispatch();

	const clickOnCreate = async (e) => {
		e.preventDefault();
		setIsLoading(true);
		await api.post('/findroom', { roomId, userId: userData._id }).then((res) => {
			if (res.data.errors) {
				setError(res.data.errors[0]);
			} else {
				setError({});
				socket.emit('JOIN_TO_ROOM', { roomId });
				dispatch(updateRoomsAC(res.data.rooms));
				dispatch(closeModalAC());
			}
			setIsLoading(false);
		});
	}

	console.log('Render: FindRoomForm');

	return (
		<form className={cl.findRoomForm}>
			<FormInput
				value={roomId}
				setValue={setRoomId}
				setError={setError}
				valueParam="roomId"
				errorParam={error.param}
				placeholder="Room's Id"
				type="text"
			/>
			<FormButton onClick={clickOnCreate} disabled={isLoading}>{isLoading ? '...' : 'Join'}</FormButton>
			<FormErrorHelp errorMsg={error.msg} />
		</form>
	);
}

export default FindRoomForm;