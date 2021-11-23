import React from 'react';
//import cl from './Registration.module.scss';
import api from '../../../http';
import Input from '../../UI/Input/Input';
import Button from '../../UI/Button/Button';
import Link from '../../UI/Link/Link';
import Form from '../../UI/Form/Form';
import ErrorModal from '../../UI/ErrorModal/ErrorModal';

const Registration = () => {
	const [email, setEmail] = React.useState('');
	const [nickname, setNickname] = React.useState('');
	const [password, setPassword] = React.useState('');
	const [retPassword, setRetPassword] = React.useState('');
	const [isLoading, setIsLoading] = React.useState(false);
	const [error, setError] = React.useState({});

	const clickOnRegisterBtn = async (e) => {
		e.preventDefault();
		setIsLoading(true);
		await api.post('/registration', { nickname, email, password, retPassword }).then((res) => {
			if (res.data.errors) {
				setError(res.data.errors[0]);
			} else {
				setError({});
			}
		});
		setIsLoading(false);
	}

	console.log('Render: Registration');

	return (
		<Form>
			<Input
				placeholder="Nickname"
				value={nickname}
				onChange={e => setNickname(e.target.value)}
				paramType="nickname"
				errorParam={error.param}
				setError={setError}
			/>
			<Input
				placeholder="Email"
				value={email}
				onChange={e => setEmail(e.target.value)}
				paramType="email"
				errorParam={error.param}
				setError={setError}
			/>
			<Input
				placeholder="Password"
				value={password}
				onChange={e => setPassword(e.target.value)}
				type="password"
				autoComplete="off"
				paramType="password"
				errorParam={error.param}
				setError={setError}
			/>
			<Input
				placeholder="Retype password"
				value={retPassword}
				onChange={e => setRetPassword(e.target.value)}
				type="password"
				autoComplete="off"
				paramType="password"
				errorParam={error.param}
				setError={setError}
			/>
			<Button onClick={clickOnRegisterBtn} disabled={isLoading}>{isLoading ? '...' : 'Register'}</Button>
			<Link toLink="/login">Back</Link>
			<ErrorModal error={error.msg} />
		</Form>
	);
}

export default Registration;