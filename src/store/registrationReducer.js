const defaultState = {
	email: 'ser',
	nickname: '',
	password: '',
	retPassword: '',
	isLoading: false,
	error: {},
}

const SET_EMAIL = 'SET_EMAIL';
const SET_NICKNAME = 'SET_NICKNAME';
const SET_PASSWORD = 'SET_PASSWORD';
const SET_RETPASSWORD = 'SET_RETPASSWORD';
const SET_IS_LOADING = 'SET_IS_LOADING';
const SET_ERROR = 'SET_ERROR';

export const registrationReducer = (state = defaultState, action) => {
	switch (action.type) {
		case SET_EMAIL:
			return { ...state, email: action.email };
		default: return state;
	}
}

export const setEmailAC = (email) => ({ type: SET_EMAIL, email })