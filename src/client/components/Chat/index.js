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
	const { activeRoom, history, user } = state.chat;
	return {
		activeRoom,
		history,
		user
	};
};

class Chat extends Component {
	componentDidMount() {
		const { initialConnect } = this.props;
		initialConnect();
	}

	render() {
		const { activeRoom, history, sendMessage, joinRoom, user } = this.props;
		return (
			<div>
				<p>{ activeRoom ? `Room: ${activeRoom}`: "You are currently in an active room"}</p>
				<p>{ user ? `Signed on as ${user}` : "Not yet connected" }</p>
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
