import cl from './UserInfo.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { closeModalAction } from '../../../store/modalReducer';
import React from 'react';
import Button from '../Button/Button';
import api from '../../../http';
import { authorizationAction } from '../../../store/userReducer';

const UserInfo = () => {
	const userData = useSelector(state => state.user.userData);
	const dispatch = useDispatch();

	const onClickLogOut = async () => {
		await api.post('/logout').then((res) => {
			console.log(res.data);
			dispatch(closeModalAction(false));
			dispatch(authorizationAction(false, null));
		})
	}

	//console.log('Render: UserInfo');

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