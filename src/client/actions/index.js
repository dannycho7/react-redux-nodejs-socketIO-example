import socketIOClient from "socket.io-client";
import * as actionTypes from "../constants";

export const sendMessage = (message) => {
  return function(dispatch, getState) {
    const { socket, activeRoom } = getState().chat;
    const message_info = Object.assign({}, message, { room: activeRoom });

    socket.emit("message", message_info);
    dispatch({
      type: actionTypes.UPDATE_HISTORY,
      payload: message_info
    });
  };
}

export const joinRoom = (room_name = "default") => {
  return function(dispatch, getState) {
    const { socket } = getState().chat,
          { message } = room_name,
          activeRoom = message;

    socket.emit("room", activeRoom);

    dispatch({
      type: actionTypes.JOIN_ROOM,
      payload: activeRoom
    });
  }
}

export const initialConnect = () => {
  return function(dispatch, getState) {
    const { endpoint, history, activeRoom } = getState().chat;
    const socket = socketIOClient(endpoint);

    socket.on("connect", () => {
      socket.emit("room", activeRoom);
      dispatch({
        type: actionTypes.SET_SOCKET,
        payload: socket
      });
    });

    socket.on("message", data => {
      console.log("Received message", data);
      dispatch({
        type: actionTypes.UPDATE_HISTORY,
        payload: data
      });
    });
  }
}