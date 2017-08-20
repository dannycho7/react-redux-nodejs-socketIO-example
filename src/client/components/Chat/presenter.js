import React from "react";
import Form from "./Form";
import Message from "./Message";

const Chat = ({ activeRoom, history, sendMessage, joinRoom }) => {
	return (
		<div className="chat">
			<div className="message-list">
				{
					history.map((message_info, key) => {
						const { user, message, timestamp } = message_info;
						return (
							activeRoom === message_info.room ? (
								<Message
									key={key}
									user={user}
									message={message}
									timestamp={timestamp}
								/>
							) : null
						);
					})
				}
			</div>
			<Form action_name="Send Message" onSubmit={sendMessage} placeHolderText="Send a message" />
			<Form action_name="Join Room" onSubmit={joinRoom} placeHolderText="Join a room" />
		</div>
	);
};

export default Chat;