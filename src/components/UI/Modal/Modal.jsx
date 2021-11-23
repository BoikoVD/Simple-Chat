import React from 'react';
import cl from './Modal.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { closeModalAction } from '../../../store/modalReducer';
import AddRoomForm from '../AddRoomForm/AddRoomForm';
import CreateRoomForm from '../CreateRoomForm/CreateRoomForm';
import UserInfo from '../UserInfo/UserInfo';
import FindRoomForm from '../FindRoomForm/FindRoomForm';

function Modal() {
	const dispatch = useDispatch();
	const modal = useSelector(state => state.modal.onModal);
	const modalType = useSelector(state => state.modal.modalType);

	const closeModal = () => {
		dispatch(closeModalAction(false));
	}

	//console.log('Render: Modal');

	return (
		<div className={modal ? [cl.modal, cl.active].join(' ') : cl.modal} onClick={closeModal}>
			<div className={cl.content} onClick={(e) => { e.stopPropagation() }}>
				{
					(modalType === 'addRoom') ? <AddRoomForm /> :
						(modalType === 'createRoom') ? <CreateRoomForm /> :
							(modalType === 'findRoom') ? <FindRoomForm /> :
								(modalType === 'userInfo') ? <UserInfo /> : ''}
				<button className={cl.close} onClick={closeModal}></button>
			</div>
		</div>
	);
}

export default Modal;