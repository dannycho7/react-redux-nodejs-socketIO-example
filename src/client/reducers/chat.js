import * as actionTypes from "../constants";

const initialState = {
	history: [],
	endpoint: "http://127.0.0.1:5000",
	socket: undefined,
	activeRoom: "default",
	rooms: []
};

const chat = (state = initialState, action) => {
	switch(action.type) {
		case actionTypes.SET_SOCKET: {
			return Object.assign({}, state, { socket: action.payload });
		}
		case actionTypes.JOIN_ROOM: {
			const rooms = state.rooms.includes(action.payload) ? state.rooms : [...state.rooms, action.payload];
			return Object.assign({}, state, {
				activeRoom: action.payload,
				rooms
			});
		}
		case actionTypes.SWITCH_ROOM: {
			return Object.assign({}, state, {
				activeRoom: action.payload
			});
		}
		case actionTypes.UPDATE_HISTORY: {
			return Object.assign({}, state, {
				history: [...state.history, action.payload]
			});
		}
		default: {
			return state;
		}
	}
}

export default chat;
