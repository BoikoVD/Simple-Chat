import React from 'react';
import { useDispatch } from 'react-redux';
import api from '../../../http';
import { authorizationAction } from '../../../store/userReducer';
import Input from '../../UI/Input/Input';
import Button from '../../UI/Button/Button';
import Link from '../../UI/Link/Link';
import Form from '../../UI/Form/Form';
import ErrorModal from '../../UI/ErrorModal/ErrorModal';
import { updateRoomsAction } from '../../../store/roomsReducer';

function Login() {
	const [email, setEmail] = React.useState('');
	const [password, setPassword] = React.useState('');
	const [isLoading, setIsLoading] = React.useState(false);
	const [error, setError] = React.useState({});
	const dispatch = useDispatch();

	const clickOnLogIn = async (e) => {
		e.preventDefault();
		setIsLoading(true);
		await api.post('/login', { email, password }).then((res) => {
			if (res.data.errors) {
				setError(res.data.errors[0]);
				setIsLoading(false);
			} else {
				setError({});
				//console.log(res.data.user);
				//console.log(res.data.rooms);
				dispatch(authorizationAction(true, res.data.user));
				dispatch(updateRoomsAction(res.data.rooms));
			}
		});
	}

	console.log('Render: Login');

	return (
		<Form>
			<Input
				placeholder="Email"
				value={email}
				onChange={e => setEmail(e.target.value)}
				dataType="email"
				error={error.param}
				setError={setError}
			/>
			<Input
				placeholder="Password"
				value={password}
				onChange={e => setPassword(e.target.value)}
				type="password"
				autoComplete="off"
				dataType="password"
				error={error.param}
				setError={setError}
			/>
			<Button onClick={clickOnLogIn} disabled={isLoading}>{isLoading ? '...' : 'LogIn'}</Button>
			<Link toLink="/registration">Registration</Link>
			<ErrorModal error={error.msg} />
		</Form>
	);
}

export default Login;