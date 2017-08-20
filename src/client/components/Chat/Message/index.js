import React from "react";

const Message = ({ user, message, timestamp }) => {
	return (
		<div>
			<span>[{timestamp}]</span> <b><span>{user}</span></b>: <span>{message}</span>
		</div>
	);
};

export default Message;
