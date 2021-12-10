import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import api from '../../../../http/index';
import cl from './UserInfo.module.scss';
import { closeModalAC } from '../../../../store/modalReducer';
import { authAC } from '../../../../store/authReducer';
import Button from '../../Button/Button';

const UserInfo = () => {
	const userData = useSelector(state => state.user.userData);
	const dispatch = useDispatch();

	const onClickLogOut = async () => {
		await api.post('/logout').then((res) => {
			dispatch(closeModalAC());
			dispatch(authAC(false));
		})
	}

	return (
		<div className={cl.userInfo}>
			<div className={cl.userData}>
				<span>Nickname:</span> {userData.nickname}
			</div>
			<div className={cl.userData}>
				<span>Email:</span> {userData.email}
			</div>
			<Button onClick={onClickLogOut}>LogOut</Button>
		</div>
	);
}

export default UserInfo;