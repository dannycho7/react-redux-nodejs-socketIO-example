import React, { Component } from "react";
import { connect } from "redux";
import socketIOClient from "socket.io-client";

import { joinRoom, sendMessage } from "../../actions";
import ChatPresenter from "./presenter";

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    sendMessage: (nessage) => dispatch(sendMessage(message)),
    joinRoom: (room_name) => dispatch(joinRoom(room_name))
  };
};

const mapStateToProps = (state, ownProps) => {
  return {
    activeRoom: state.chat.activeRoom,
    history: state.chat.history
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
    const { activeRoom, history, sendMessage, joinRoom } = this.props;
    return (
      <div>
        <h2>You are currently in the {activeRoom} room</h2>
        <ChatPresenter
          sendMessage={sendMessage}
          history={history}
          activeRoom={activeRoom}
          joinRoom={joinRoom}
        />
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
