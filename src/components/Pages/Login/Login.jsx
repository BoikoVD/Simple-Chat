import React from 'react';
import { useDispatch } from 'react-redux';
import api from '../../../http';
import socket from '../../../socket/socket';
import { authAC } from '../../../store/authReducer';
import { updateUserDataAC } from '../../../store/userReducer';
import { updateRoomsAC } from '../../../store/roomsReducer';
import { setErrorAC, setIsLoadingAC } from '../../../store/formReducer';
import CustomLink from '../../UI/CustomLink/CustomLink';
import Form from '../../UI/Form/Form';
import FormInput from '../../UI/Form/FormInput/FormInput';
import FormButton from '../../UI/Form/FormButton/FormButton';
import FormErrorHelp from '../../UI/Form/FormErrorHelp/FormErrorHelp';

function Login() {
	const dispatch = useDispatch();

	const submitForm = async (e) => {
		e.preventDefault();
		dispatch(setIsLoadingAC(true));
		const email = e.target.email.value;
		const password = e.target.password.value;
		await api.post('/login', { email, password }).then((res) => {
			if (res.data.errors) {
				dispatch(setErrorAC(res.data.errors[0]));
				dispatch(setIsLoadingAC(false));
			} else {
				socket.emit('JOIN', { rooms: res.data.rooms });
				dispatch(updateUserDataAC(res.data.user));
				dispatch(updateRoomsAC(res.data.rooms));
				dispatch(authAC(true));
			}
		});
	}

	return (
		<Form autoComplete="off" onSubmit={submitForm}>
			<FormInput
				name="email"
				placeholder="Email"
				type="text"
			/>
			<FormInput
				name="password"
				placeholder="Password"
				type="password"
				autoComplete="off"
			/>
			<FormButton>LogIn</FormButton>
			<CustomLink to="/registration">Registration</CustomLink>
			<FormErrorHelp />
		</Form>
	);
}

export default Login;