const defaultState = {
	isAuth: false,
	userData: null
}

const AUTHORIZATION = 'AUTHORIZATION';
const UPDATE_USER_DATA = 'UPDATE_USER_DATA';

export const userReducer = (state = defaultState, action) => {
	switch (action.type) {
		case AUTHORIZATION:
			return { ...state, isAuth: action.isAuth, userData: action.userData };
		case UPDATE_USER_DATA:
			return { ...state, userData: action.userData };
		default: return state;
	}
}

export const authorizationAction = (isAuth, userData) => ({ type: AUTHORIZATION, isAuth, userData })
export const updateUserDataAction = (userData) => ({ type: UPDATE_USER_DATA, userData })