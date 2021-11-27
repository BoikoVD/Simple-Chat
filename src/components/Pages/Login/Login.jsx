import React from 'react';
import { useDispatch } from 'react-redux';
import api from '../../../http';
import socket from '../../../socket/socket';
import { authAC } from '../../../store/authReducer';
import { updateUserDataAC } from '../../../store/userReducer';
import { updateRoomsAC } from '../../../store/roomsReducer';
import CustomLink from '../../UI/CustomLink/CustomLink';
import Form from '../../UI/Form/Form';
import FormInput from '../../UI/Form/FormInput/FormInput';
import FormButton from '../../UI/Form/FormButton/FormButton';
import FormErrorHelp from '../../UI/Form/FormErrorHelp/FormErrorHelp';

function Login() {
	const [email, setEmail] = React.useState('');
	const [password, setPassword] = React.useState('');
	const [isLoading, setIsLoading] = React.useState(false);
	const [error, setError] = React.useState({});
	const dispatch = useDispatch();

	const clickOnLogInBtn = async (e) => {
		e.preventDefault();
		setIsLoading(true);
		await api.post('/login', { email, password }).then((res) => {
			if (res.data.errors) {
				setError(res.data.errors[0]);
				setIsLoading(false);
			} else {
				socket.emit('JOIN', { rooms: res.data.rooms });
				dispatch(updateUserDataAC(res.data.user));
				dispatch(updateRoomsAC(res.data.rooms));
				dispatch(authAC(true));
			}
		});
	}

	console.log('Render: Login');

	return (
		<Form>
			<FormInput
				value={email}
				setValue={setEmail}
				setError={setError}
				valueParam="email"
				errorParam={error.param}
				placeholder="Email"
				type="text"
			/>
			<FormInput
				value={password}
				setValue={setPassword}
				setError={setError}
				valueParam="password"
				errorParam={error.param}
				placeholder="Password"
				type="password"
				autoComplete="off"
			/>
			<FormButton onClick={clickOnLogInBtn} disabled={isLoading}>{isLoading ? '...' : 'LogIn'}</FormButton>
			<CustomLink to="/registration">Registration</CustomLink>
			<FormErrorHelp errorMsg={error.msg} />
		</Form>
	);
}

export default Login;