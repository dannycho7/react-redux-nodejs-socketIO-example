import React from "react";
import Form from "./Form";
import Message from "./Message";

const Chat = ({ activeRoom, messages, sendMessage, joinRoom }) => {
	return (
		<div className="chat">
			<div className="message-list">
				{
					messages.map((message_info, key) => {
						const { user, content, timestamp } = message_info;
						return (
							<Message
								key={key}
								user={user}
								content={content}
								timestamp={timestamp}
							/>
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