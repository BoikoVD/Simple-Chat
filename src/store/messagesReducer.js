const defaultState = {
	messages: [],
}

const GET_MESSAGES = 'GET_MESSAGES';
const NEW_MESSAGE = 'NEW_MESSAGE';

export const messagesReducer = (state = defaultState, action) => {
	switch (action.type) {
		case GET_MESSAGES:
			return { ...state, messages: action.messages };
		case NEW_MESSAGE:
			return { ...state, messages: [...state.messages, action.message], };
		default: return state;
	}
}

export const getMessagesAC = (messages) => ({ type: GET_MESSAGES, messages });
export const newMessageAC = (message) => ({ type: NEW_MESSAGE, message });