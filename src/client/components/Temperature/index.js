import React, { Component } from "react";
import socketIOClient from "socket.io-client";
import TemperaturePresenter from "./presenter";

class Temperature extends Component {
  constructor() {
    super();
    this.state = {
      response: false,
      endpoint: "http://127.0.0.1:5000",
      polling: false,
      socket: undefined
    };
  }

  componentDidMount() {
    const { endpoint } = this.state;

    const socket = socketIOClient(endpoint);

    socket.on("FromAPI", data => this.setState({ response: data }));

    this.setState({ socket });
  }

  sendPoll() {
    const { polling, socket } = this.state;

    polling ? socket.emit("stop") : socket.emit("poll");

    this.setState({
      polling: !polling
    });
  }

  render() {
    const { response } = this.state;
    return (
      <div>
        <TemperaturePresenter response={response} polling={this.state.polling} />
        <button onClick={() => this.sendPoll()}>{ this.state.polling ? "Stop Updating" : "Request Weather" }</button>
      </div>
    );
  }
}

export default Temperature;