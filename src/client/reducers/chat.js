import * as actionTypes from "../constants";

const initialState = {
	history: {},
	endpoint: "/",
	socket: null,
	activeRoom: null,
	rooms: [],
};

const chat = (state = initialState, action) => {
	switch(action.type) {
		case actionTypes.SOCKET_CONNECT_SUCCESS: {
			const { socket } = action;
			return Object.assign({}, state, { socket });
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
		case actionTypes.LOAD_HISTORY: {
			return Object.assign({}, state, {
				history: Object.assign({}, state.history, { [action.room]: action.payload })
			});
		}
		case actionTypes.UPDATE_HISTORY: {
			return Object.assign({}, state, {
				history: Object.assign({}, state.history, { [action.room]: [...state.history[action.room], action.payload] })
			});
		}
		default: {
			return state;
		}
	}
};

export default chat;
