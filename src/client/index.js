import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import {
	BrowserRouter as Router,
	Route
} from "react-router-dom";
import store from "./stores";

import App from "./components/App";
import Chat from "./components/Chat";


ReactDOM.render(
	<Provider store={store}>
		<Router>
			<App>
				<Route path="/" component={Chat}/>
			</App>
		</Router>
	</Provider>,
	document.getElementById("root")
);