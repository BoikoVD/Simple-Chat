const defaultState = {
	activeRoom: {},
	rooms: []
}

const SET_ACTIVE_ROOM = 'SET_ACTIVE_ROOM';
const UPDATE_ROOMS = 'UPDATE_ROOMS';

export const roomsReducer = (state = defaultState, action) => {
	switch (action.type) {
		case SET_ACTIVE_ROOM:
			return { ...state, activeRoom: action.activeRoom };
		case UPDATE_ROOMS:
			return { ...state, rooms: action.rooms };
		default: return state;
	}
}

export const setActiveRoomAction = (activeRoom) => ({ type: SET_ACTIVE_ROOM, activeRoom });
export const updateRoomsAction = (rooms) => ({ type: UPDATE_ROOMS, rooms });