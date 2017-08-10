import * as actionTypes from "../constants";

sendMessage(message) {
  const { socket, activeRoom } = this.state,
  message_info = Object.assign({}, message, { room: activeRoom });

  socket.emit("message", message_info);
  this.updateHistory(message_info)
}

joinRoom(room_name) {
  const { socket, rooms } = this.state,
        { message } = room_name,
        activeRoom = message;

  socket.emit("room", activeRoom);

  return {
    type: actionTypes.JOIN_ROOM
    payload: {
      activeRoom,
      rooms: activeRoom
    }
  };
}

updateHistory(message_info) {
  return {
    type: actionTypes.UPDATE_HISTORY,
    payload: message_info
  }; 
}