import React, { Component } from "react";
import { connect } from "redux";
import socketIOClient from "socket.io-client";

import { } from "../../actions";
import ChatPresenter from "./presenter";

const mapDispatchToProps = (dispatch, ownProps) => {
  return {

  };
};

const mapStateToProps = (state, ownProps) => {
  return {

  };
};

class Chat extends Component {
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
