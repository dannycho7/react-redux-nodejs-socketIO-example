import React from "react";

const Temperature = ({ response }) => {
	return (
		<div style={{ textAlign: "center" }}>
		{
			response ?
				<p>The temperature in Florence is: {response} °F</p>
				: <p>Loading...</p>
		}
		</div>
	);
};

export default Temperature;