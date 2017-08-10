import React, { Component } from "react";
import socketIOClient from "socket.io-client";
import ChatPresenter from "./presenter";

class Chat extends Component {
  constructor() {
    super();
    this.state = {
      history: [],
      endpoint: "http://127.0.0.1:5000",
      socket: undefined,
      activeRoom: "default",
      rooms: []
    };

    this.sendMessage = this.sendMessage.bind(this);
    this.joinRoom = this.joinRoom.bind(this);
  }

  componentDidMount() {
    const { endpoint, history, activeRoom } = this.state;

    const socket = socketIOClient(endpoint);

    socket.on("connect", () => {
      socket.emit("room", activeRoom);
      this.setState({ socket });
    });

    socket.on("message", data => {
      console.log("Received message", data);
      this.updateHistory(data);
    });
  }

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
    this.setState({
      activeRoom,
      rooms: [...rooms, activeRoom]
    });
  }

  updateHistory(message_info) {
    const { history } = this.state;
    this.setState({ history: [...history, message_info] }); 
  }

  render() {
    const { activeRoom, history } = this.state;
    return (
      <div>
        <h2>You are currently in the {activeRoom} room</h2>
        <ChatPresenter
          sendMessage={this.sendMessage}
          history={history}
          activeRoom={activeRoom}
          joinRoom={this.joinRoom}
        />
      </div>
    );
  }
}

export default Chat;
