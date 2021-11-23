import React from 'react';
import Button from '../Button/Button';
import Input from '../Input/Input';
import cl from './CreateRoomForm.module.scss';
import { useSelector, useDispatch } from 'react-redux';
import { closeModalAction } from '../../../store/modalReducer';
import api from '../../../http';
import { updateUserDataAction } from '../../../store/userReducer';
import { updateRoomsAction } from '../../../store/roomsReducer';

const CreateRoomForm = () => {
	const [roomName, setRoomName] = React.useState('');
	const [isLoading, setIsLoading] = React.useState(false);
	const [error, setError] = React.useState({});
	const userData = useSelector(state => state.user.userData);
	const dispatch = useDispatch();

	const clickOnCreate = async (e) => {
		e.preventDefault();
		setIsLoading(true);
		await api.post('/addroom', { roomName, creatorId: userData._id }).then((res) => {
			if (res.data.errors) {
				setError(res.data.errors[0]);
			} else {
				setError({});
				dispatch(updateRoomsAction(res.data.rooms));
				dispatch(updateUserDataAction(res.data.userData));
				dispatch(closeModalAction(false));
			}
			setIsLoading(false);
		});
	}

	//console.log('Render: CreateRoomForm');

	return (
		<form className={cl.createRoomForm}>
			<Input
				placeholder="Room name"
				value={roomName}
				onChange={e => setRoomName(e.target.value)}
				dataType="roomName"
				error={error.param}
				setError={setError}
			/>
			<Button onClick={clickOnCreate} disabled={isLoading}>{isLoading ? '...' : 'Create'}</Button>
		</form>
	);
}

export default CreateRoomForm;