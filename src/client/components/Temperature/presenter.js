import React from "react";

const Temperature = ({ response, polling }) => {
	return (
		<div style={{ textAlign: "center" }}>
		{
			response ?
				<p>The temperature in Florence is: {response} °F</p>
				: (polling ? <p>Loading...</p> : null)
		}
		</div>
	);
};

export default Temperature;