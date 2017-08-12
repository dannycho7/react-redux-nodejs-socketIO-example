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
	return {
		activeRoom: state.chat.activeRoom,
		history: state.chat.history
	};
};

class Chat extends Component {
	componentDidMount() {
		const { initialConnect } = this.props;
		initialConnect();
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
