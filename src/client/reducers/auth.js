import * as actionTypes from "../constants";

const initialState = {
	isAuthenticated: false,
	user: null,
	authMessage: ""
};

const socketConnectSuccess = (state, action) => {
	if(state.isAuthenticated) {
		return state;
	} else {
		const { socket } = action;
		const user = "guest-" + socket.id;
		return Object.assign({}, state, { user });
	}
}

const auth = (state = initialState, action) => {
	switch(action.type) {
		case actionTypes.AUTH_START:
			return Object.assign({}, state, { authMessage: action.message });
		case actionTypes.AUTH_FAILURE:
			return Object.assign({}, state, { authMessage: action.message });
		case actionTypes.AUTH_SUCCESS:
			return Object.assign({}, state, { isAuthenticated: true, user: action.user, authMessage: "" });
		case actionTypes.SOCKET_CONNECT_SUCCESS: 
			return socketConnectSuccess(state, action)
		default:
			return state;
	}
}

export default auth;
