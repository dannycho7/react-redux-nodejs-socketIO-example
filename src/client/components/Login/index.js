import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router";

import Form from "./Form";
import { login } from "../../actions";

const mapStateToProps = (state) => {
	const { isAuthenticated, authMessage } = state.auth;
	return {
		isAuthenticated,
		authMessage
	};
}

const mapDispatchToProps = (dispatch) => {
	return {
		login: (values, history) => dispatch(login(values, history))
	};
};

const Login = ({ match, login, history, isAuthenticated, location, authMessage }) => {
	if(isAuthenticated) {
		return <Redirect to="/" />;
	}
	return (
		<div>
			{ authMessage ? <h1 style={{ color: "red" }}>{ authMessage }</h1> : null }
			{ location.state ? <h1>{ location.state.message }</h1> : null }
			<h1>Login</h1>
			<Form handleSubmit={ (values) => login(values, history) }/>
		</div>
	);
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
