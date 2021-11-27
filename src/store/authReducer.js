const defaultState = {
	isAuth: false
}

const AUTHORIZATION = 'AUTHORIZATION';

export const authReducer = (state = defaultState, action) => {
	switch (action.type) {
		case AUTHORIZATION:
			return { ...state, isAuth: action.isAuth };
		default: return state;
	}
}

export const authAC = (isAuth) => ({ type: AUTHORIZATION, isAuth })