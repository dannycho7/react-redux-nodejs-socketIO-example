import * as actionTypes from "../constants";

const initialState = {
	history: [],
	endpoint: "/",
	socket: null,
	activeRoom: null,
	rooms: [],
	user: null
};

const chat = (state = initialState, action) => {
	switch(action.type) {
	case actionTypes.CONNECT_SUCCESS: {
		const { user, socket } = action;
		console.log(socket);
		return Object.assign({}, state, { user, socket });
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
};

export default chat;
