import React from 'react';
import { useDispatch } from 'react-redux';
import { openModalAC } from '../../../../store/modalReducer';
import cl from './AddRoomForm.module.scss';
import Button from '../../Button/Button';

const AddRoomForm = () => {
	const dispatch = useDispatch();

	const onClickCreateRoom = (e) => {
		e.preventDefault();
		dispatch(openModalAC('createRoom'))
	}
	const onClickFindRoom = (e) => {
		e.preventDefault();
		dispatch(openModalAC('findRoom'))
	}

	console.log('Render: AddRoomForm');

	return (
		<div className={cl.addRoomForm}>
			<Button onClick={onClickCreateRoom}>Create Room</Button>
			<Button onClick={onClickFindRoom}>Find Room</Button>
		</div>
	);
}

export default AddRoomForm;