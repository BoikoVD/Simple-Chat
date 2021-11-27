import React from 'react';
import cl from './Modal.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { closeModalAC } from '../../../store/modalReducer';
import AddRoomForm from './AddRoomForm/AddRoomForm';
import CreateRoomForm from './CreateRoomForm/CreateRoomForm';
import UserInfo from './UserInfo/UserInfo';
import FindRoomForm from './FindRoomForm/FindRoomForm';
import RoomInfo from './RoomInfo/RoomInfo';

function Modal() {
	const dispatch = useDispatch();
	const modal = useSelector(state => state.modal.onModal);
	const modalContent = useSelector(state => state.modal.modalContent);

	const closeModal = () => {
		dispatch(closeModalAC(false));
	}

	console.log('Render: Modal');

	return (
		<div className={modal ? [cl.modal, cl.active].join(' ') : cl.modal} onClick={closeModal}>
			<div className={cl.content} onClick={(e) => { e.stopPropagation() }}>
				{(modalContent === 'addRoom') ? <AddRoomForm /> :
					(modalContent === 'createRoom') ? <CreateRoomForm /> :
						(modalContent === 'findRoom') ? <FindRoomForm /> :
							(modalContent === 'userInfo') ? <UserInfo /> :
								(modalContent === 'roomInfo') ? <RoomInfo /> : ''}
				<button className={cl.close} onClick={closeModal}></button>
			</div>
		</div>
	);
}

export default Modal;