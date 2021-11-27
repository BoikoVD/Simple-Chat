const defaultState = {
	activeRoom: {},
	rooms: null
}

const SET_ACTIVE_ROOM = 'SET_ACTIVE_ROOM';
const UPDATE_ROOMS = 'UPDATE_ROOMS';
const NEW_MESSAGE = 'NEW_MESSAGE';

export const roomsReducer = (state = defaultState, action) => {
	switch (action.type) {
		case SET_ACTIVE_ROOM:
			return { ...state, activeRoom: action.activeRoom };
		case UPDATE_ROOMS:
			return { ...state, rooms: action.rooms };
		case NEW_MESSAGE:
			return {
				...state, rooms: state.rooms.map(room => {
					if (action.roomId === room._id) {
						room.messages = [...room.messages, action.message];
						return room;
					} else {
						return room;
					}
				})
			};
		default: return state;
	}
}

export const setActiveRoomAС = (activeRoom) => ({ type: SET_ACTIVE_ROOM, activeRoom });
export const updateRoomsAC = (rooms) => ({ type: UPDATE_ROOMS, rooms });
export const newMessageAC = (roomId, message) => ({ type: NEW_MESSAGE, roomId, message });