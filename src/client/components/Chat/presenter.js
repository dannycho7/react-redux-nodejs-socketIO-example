import React from "react";
import Form from "../Form";

const Chat = ({ activeRoom, history, sendMessage, joinRoom }) => {
	return (
		<div>
			{
				history.map((message_info, key) => {
					return (
						activeRoom === message_info.room ? <div key={key}>{message_info.message}</div>: null
					);
				})
			}
			<Form action_name="Send Message" onSubmit={sendMessage} />
			<Form action_name="Join Room" onSubmit={joinRoom} />
		</div>
	);
};

export default Chat;