import React from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../../http';
import Form from '../../UI/Form/Form';
import FormInput from '../../UI/Form/FormInput/FormInput';
import FormButton from '../../UI/Form/FormButton/FormButton';
import FormErrorHelp from '../../UI/Form/FormErrorHelp/FormErrorHelp';
import CustomLink from '../../UI/CustomLink/CustomLink';
import Modal from '../../UI/Modal/Modal';

const Registration = () => {
	const [nickname, setNickname] = React.useState('');
	const [email, setEmail] = React.useState('');
	const [password, setPassword] = React.useState('');
	const [retPassword, setRetPassword] = React.useState('');
	const [isLoading, setIsLoading] = React.useState(false);
	const [error, setError] = React.useState({});
	const navigate = useNavigate();

	const clickOnRegisterBtn = async (e) => {
		e.preventDefault();
		setIsLoading(true);
		await api.post('/registration', { nickname, email, password, retPassword }).then((res) => {
			if (res.data.errors) {
				setError(res.data.errors[0]);
				setIsLoading(false);
			} else {
				navigate("complete");
			}
		});
	}

	console.log('Render: Registration');

	return (
		<Form>
			<FormInput
				value={nickname}
				setValue={setNickname}
				setError={setError}
				valueParam="nickname"
				errorParam={error.param}
				placeholder="Nickname"
				type="text"
			/>
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
			<FormInput
				value={retPassword}
				setValue={setRetPassword}
				setError={setError}
				valueParam="password"
				errorParam={error.param}
				placeholder="Retype password"
				type="password"
				autoComplete="off"
			/>
			<FormButton onClick={clickOnRegisterBtn} disabled={isLoading}>{isLoading ? '...' : 'Register'}</FormButton>
			<CustomLink to="/">Back</CustomLink>
			<FormErrorHelp errorMsg={error.msg} />
			<Modal />
		</Form>
	);
}

export default Registration;