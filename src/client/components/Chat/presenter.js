import React from "react";
import Form from "../Form";

const Chat = ({ history, sendMessage }) => {
	return (
		<div style={{ textAlign: "center" }}>
			{
				history.map((message_info, key) => {
					return (
						<div key={key}>{message_info.message}</div>
					)
				})
			}
			<Form onSubmit={sendMessage}/>
		</div>
	);
};

export default Chat;