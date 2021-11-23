import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { messagesReducer } from './messagesReducer';
import { modalReducer } from './modalReducer';
import { registrationReducer } from './registrationReducer';
import { roomsReducer } from './roomsReducer';
import { userReducer } from './userReducer';

const rootReducer = combineReducers({
	user: userReducer,
	rooms: roomsReducer,
	messages: messagesReducer,
	modal: modalReducer,
	registration: registrationReducer
});

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));