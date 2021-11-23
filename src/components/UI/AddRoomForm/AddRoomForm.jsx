import Button from '../Button/Button';
import cl from './AddRoomForm.module.scss';
import { useDispatch } from 'react-redux';
import { onModalAction } from '../../../store/modalReducer';
import React from 'react';

const AddRoomForm = () => {
	const dispatch = useDispatch();

	const onClickCreateRoom = (e) => {
		e.preventDefault();
		dispatch(onModalAction(true, 'createRoom'))
	}
	const onClickFindRoom = (e) => {
		e.preventDefault();
		dispatch(onModalAction(true, 'findRoom'))
	}
	//console.log('Render: AddRoomForm');

	return (
		<form className={cl.addRoomForm}>
			<Button onClick={onClickCreateRoom}>Create Room</Button>
			<Button onClick={onClickFindRoom}>Find Room</Button>
		</form>
	);
}

export default AddRoomForm;