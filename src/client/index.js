import React from "react";
import ReactDOM from "react-dom";
import {
	BrowserRouter as Router,
	Route
} from "react-router-dom";

import App from "./components/App";
import Chat from "./components/Chat";

ReactDOM.render(
	<Router>
		<App>
			<Route path="/" component={Chat}/>
		</App>
	</Router>,
	document.getElementById("root")
);