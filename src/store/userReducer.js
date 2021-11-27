const defaultState = {
	userData: null
}

const UPDATE_USER_DATA = 'UPDATE_USER_DATA';

export const userReducer = (state = defaultState, action) => {
	switch (action.type) {
		case UPDATE_USER_DATA:
			return { ...state, userData: action.userData };
		default: return state;
	}
}

export const updateUserDataAC = (userData) => ({ type: UPDATE_USER_DATA, userData })