import React, { Component } from "react";
import socketIOClient from "socket.io-client";
import TemperaturePresenter from "./presenter";

class Temperature extends Component {
  constructor() {
    super();
    this.state = {
      response: false,
      endpoint: "http://127.0.0.1:5000"
    };
  }
  componentDidMount() {
    const { endpoint } = this.state;
    const socket = socketIOClient(endpoint);
    socket.on("FromAPI", data => this.setState({ response: data }));
  }
  render() {
    const { response } = this.state;
    return (
      <TemperaturePresenter response={response} />
    );
  }
}

export default Temperature;