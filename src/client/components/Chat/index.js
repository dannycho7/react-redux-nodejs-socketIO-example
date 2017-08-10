import React, { Component } from "react";
import socketIOClient from "socket.io-client";
import ChatPresenter from "./presenter";

class Temperature extends Component {
  constructor() {
    super();
    this.state = {
      history: [],
      endpoint: "http://127.0.0.1:5000",
      socket: undefined
    };

    this.sendMessage = this.sendMessage.bind(this);
  }

  componentDidMount() {
    const { endpoint } = this.state;

    const socket = socketIOClient(endpoint);

    socket.on("message", data => this.setState({ history: [...this.state.history, data] }));

    this.setState({ socket });
  }

  sendMessage(message_info) {
    this.state.socket.emit("message", message_info);
  }

  render() {
    const { response } = this.state;
    return (
      <div>
        <ChatPresenter sendMessage={this.sendMessage} history={this.state.history} />
      </div>
    );
  }
}

export default Temperature;