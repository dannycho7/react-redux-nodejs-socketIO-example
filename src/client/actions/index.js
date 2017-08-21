import socketIOClient from "socket.io-client";
import * as actionTypes from "../constants";

function updateHistory(message) {
	return {
		type: actionTypes.UPDATE_HISTORY,
		room: message.room,
		payload: message
	}
}

export const sendMessage = (content) => {
	return function(dispatch, getState) {
		const state = getState();
		const { socket, activeRoom } = state.chat;
		const { user } = state.auth;
		const timestamp = new Date().toISOString().substr(11, 8); // Hour minute seconds format
		const message_info = Object.assign({}, { content }, { room: activeRoom, timestamp });

		socket.emit("message", message_info);
		dispatch(updateHistory(Object.assign({}, message_info, {user})));
	};
};

export const joinRoom = (roomName) => {
	return function(dispatch, getState) {
		const { socket } = getState().chat;

		socket.once("fetch-" + roomName, history => {
			console.log(history);
			dispatch({
				type: actionTypes.LOAD_HISTORY,
				room: roomName,
				payload: history
			});
		});

		socket.emit("room", roomName);

		dispatch({
			type: actionTypes.JOIN_ROOM,
			payload: roomName
		});
	};
};

export const initialConnect = (defaultRoom = "default") => {
	return function(dispatch, getState) {
		const state = getState();
		const { endpoint, activeRoom } = state.chat;
		const { user } = state.auth;
		const socket = socketIOClient(endpoint);

		socket.on("connect", () => {
			dispatch({
				type: actionTypes.SOCKET_CONNECT_SUCCESS,
				socket
			});
			if(!activeRoom) dispatch(joinRoom(defaultRoom));
		});

		socket.on("message", message_info => {
			console.log("Received message", message_info);
			dispatch(updateHistory(message_info));
		});
	};
};

export const signup = (values, history) => {
	return function(dispatch, getState) {
		var xhttp = new XMLHttpRequest();

		xhttp.addEventListener("load", () => {
			let response = JSON.parse(xhttp.responseText)
			history.push("/login", {
				message: "Successfully Signed Up"
			});
		});

		xhttp.open("POST", "/signup");
		xhttp.setRequestHeader("Content-type", "application/json");

		const { username, password } = values;

		xhttp.send(JSON.stringify({ username, password }));
	}
}

export const login = (values, history) => {
	return function(dispatch, getState) {
		var xhttp = new XMLHttpRequest();

		dispatch({ type: actionTypes.AUTH_START, message: "Attempting to authenticate user..." });

		xhttp.addEventListener("load", () => {
			let response = JSON.parse(xhttp.responseText);
			if(response.user) {
				dispatch({
					type: actionTypes.AUTH_SUCCESS,
					user: response.user
				});
				history.push("/", {
					message: "Successfully Logged In"
				});
			} else {
				dispatch({
					type: actionTypes.AUTH_FAILURE,
					message: response.message
				});
			}
		});

		xhttp.open("POST", "/login");
		xhttp.setRequestHeader("Content-type", "application/json");

		const { username, password } = values;

		xhttp.send(JSON.stringify({ username, password }));
	}
};
