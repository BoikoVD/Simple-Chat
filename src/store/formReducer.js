const defaultState = {
	isLoading: false,
	error: {}
}

const SET_IS_LOADING = 'SET_IS_LOADING';
const SET_ERROR = 'SET_ERROR';

export const formReducer = (state = defaultState, action) => {
	switch (action.type) {
		case SET_IS_LOADING:
			return { ...state, isLoading: action.isLoading };
		case SET_ERROR:
			return { ...state, error: action.error };
		default: return state;
	}
}

export const setIsLoadingAC = (isLoading) => ({ type: SET_IS_LOADING, isLoading });
export const setErrorAC = (error) => ({ type: SET_ERROR, error });