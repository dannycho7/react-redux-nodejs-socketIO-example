import React from "react";

const Message = ({ user, content, timestamp }) => {
	return (
		<div>
			<span>[{timestamp}]</span> <b><span>{user}</span></b>: <span>{content}</span>
		</div>
	);
};

export default Message;
