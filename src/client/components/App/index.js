import React from "react";
import { Link, NavLink, withRouter } from "react-router-dom";
import { connect } from "react-redux";

const mapStateToProps = (state) => {
	const { isAuthenticated } = state.auth;
	return {
		isAuthenticated
	};
};

const App = ({ children, isAuthenticated }) => {
	return (
		<div>
			{	
				isAuthenticated ? (
					null
				) : (
					<div>
						<NavLink to="/">Chat</NavLink>
						<Link to="/login">Login</Link>
						<Link to="/signup">Signup</Link>
					</div>
				)
			}
			{children}
		</div>
	);
};

export default withRouter(connect(mapStateToProps)(App));