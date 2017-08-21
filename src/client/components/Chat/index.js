import React, { Component } from "react";
import { connect } from "react-redux";

import { joinRoom, sendMessage, initialConnect } from "../../actions";
import ChatPresenter from "./presenter";

const mapDispatchToProps = (dispatch) => {
	return {
		sendMessage: (message) => dispatch(sendMessage(message)),
		joinRoom: (room_name) => dispatch(joinRoom(room_name)),
		initialConnect: () => dispatch(initialConnect())
	};
};

const mapStateToProps = (state) => {
	const { activeRoom, history, socket } = state.chat;
	const { user, isAuthenticated } = state.auth;
	return {
		activeRoom,
		history,
		user,
		isAuthenticated,
		socket
	};
};

class Chat extends Component {
	componentDidMount() {
		const { initialConnect } = this.props;
		initialConnect();
	}
	componentWillUnmount() {
		const { socket } = this.props;

		if(socket) {
			socket.disconnect();
		}
	}

	render() {
		const { activeRoom, history, sendMessage, joinRoom, user, isAuthenticated, location } = this.props;
		const messages = history[activeRoom] || [];
		return (
			<div>
				{ location.state ? <h1>{ location.state.message }</h1> : null }
				<p>{ activeRoom ? `Room: ${activeRoom}`: "You are currently in an active room"}</p>
				<p>{ user ? `Signed on as ${user}` : "Not yet connected" }</p>
				{ isAuthenticated ? null : <p>Not yet authenticated</p> }
				<ChatPresenter
					sendMessage={sendMessage}
					messages={messages}
					joinRoom={joinRoom}
				/>
			</div>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
