import React from "react";
import ReactDOM from "react-dom";
import {
	BrowserRouter as Router,
	Route
} from "react-router-dom";

import App from "./components/App";
import Temperature from "./components/Temperature";

ReactDOM.render(
	<Router>
		<App>
			<Route path="/" component={Temperature}/>
		</App>
	</Router>,
	document.getElementById("root")
);