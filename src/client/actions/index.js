import * as actionTypes from "../constants";

export sendMessage(message) {
  const { socket, activeRoom } = this.state,
  message_info = Object.assign({}, message, { room: activeRoom });

  socket.emit("message", message_info);

  return {
    type: actionTypes.UPDATE_HISTORY,
    payload: message_info
  };
}

export joinRoom(room_name = "default") {
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

export initialConnect() {
  const { endpoint, history, activeRoom } = this.props;

  const socket = socketIOClient(endpoint);

  return function(state) {
    socket.on("connect", () => {
      socket.emit("room", activeRoom);
      this.setState({ socket });
    });

    socket.on("message", data => {
      console.log("Received message", data);
      this.updateHistory(data);
    });
  }
}