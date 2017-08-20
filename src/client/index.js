import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import {
	BrowserRouter as Router,
	Route,
	Switch
} from "react-router-dom";
import store from "./stores";

import App from "./components/App";
import Chat from "./components/Chat";
import Signup from "./components/Signup";


ReactDOM.render(
	<Provider store={store}>
		<Router>
			<App>
				<Switch>
					<Route path="/signup" component={Signup} />
					<Route path="/" component={Chat} />
				</Switch>
			</App>
		</Router>
	</Provider>,
	document.getElementById("root")
);