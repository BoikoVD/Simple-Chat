import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { authReducer } from './authReducer';
import { formReducer } from './formReducer';
import { messagesReducer } from './messagesReducer';
import { modalReducer } from './modalReducer';
import { roomsReducer } from './roomsReducer';
import { userReducer } from './userReducer';

const rootReducer = combineReducers({
	auth: authReducer,
	user: userReducer,
	rooms: roomsReducer,
	messages: messagesReducer,
	modal: modalReducer,
	form: formReducer,
});

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));