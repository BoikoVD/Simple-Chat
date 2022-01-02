import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import api from '../../../http';
import { setErrorAC, setIsLoadingAC } from '../../../store/formReducer';
import Form from '../../UI/Form/Form';
import FormInput from '../../UI/Form/FormInput/FormInput';
import FormButton from '../../UI/Form/FormButton/FormButton';
import FormErrorHelp from '../../UI/Form/FormErrorHelp/FormErrorHelp';
import CustomLink from '../../UI/CustomLink/CustomLink';

const Registration = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const submitForm = async (e) => {
		e.preventDefault();
		dispatch(setIsLoadingAC(true));
		const nickname = e.target.nickname.value;
		const email = e.target.email.value;
		const password = e.target.password.value;
		const retPassword = e.target.retPassword.value;
		await api.post('/registration', { nickname, email, password, retPassword }).then((res) => {
			if (res.data.errors) {
				dispatch(setErrorAC(res.data.errors[0]));
				dispatch(setIsLoadingAC(false));
			} else {
				dispatch(setIsLoadingAC(false));
				navigate("complete");
			}
		});
	}

	return (
		<Form autoComplete="off" onSubmit={submitForm}>
			<FormInput
				name="nickname"
				placeholder="Nickname"
				type="text"
			/>
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
			<FormInput
				name="retPassword"
				placeholder="Retype password"
				type="password"
				autoComplete="off"
			/>
			<FormButton >Register</FormButton>
			<CustomLink to="/">Back</CustomLink>
			<FormErrorHelp />
		</Form>
	);
}

export default Registration;