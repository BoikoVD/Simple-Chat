import React from 'react';
import Button from '../Button/Button';
import Input from '../Input/Input';
import cl from './FindRoomForm.module.scss';
import { useSelector, useDispatch } from 'react-redux';
import { closeModalAction } from '../../../store/modalReducer';
import api from '../../../http';
import { updateUserDataAction } from '../../../store/userReducer';
import { updateRoomsAction } from '../../../store/roomsReducer';

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
				dispatch(updateRoomsAction(res.data.rooms));
				dispatch(updateUserDataAction(res.data.userData));
				dispatch(closeModalAction(false));
			}
			setIsLoading(false);
		});
	}

	//console.log('Render: FindRoomForm');

	return (
		<form className={cl.findRoomForm}>
			<Input
				placeholder="Room Id"
				value={roomId}
				onChange={e => setRoomId(e.target.value)}
				dataType="roomId"
				error={error.param}
				setError={setError}
			/>
			<Button onClick={clickOnCreate} disabled={isLoading}>{isLoading ? '...' : 'Join'}</Button>
		</form>
	);
}

export default FindRoomForm;