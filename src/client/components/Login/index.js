import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router";

import Form from "./Form";
import { login } from "../../actions";

const mapStateToProps = (state) => {
	const { isAuthenticated } = state.auth.isAuthenticated;
	return {
		isAuthenticated
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		login: (values, history) => dispatch(login(values, history))
	};
};

const Login = ({ match, login, history, isAuthenticated }) => {
	return (
		isAuthenticated ? <Redirect to="/" /> : (
			<div>
				<h1>Login</h1>
				<Form handleSubmit={ (values) => login(values, history) }/>
			</div>
		)
	);
};

export default connect(null, mapDispatchToProps)(Login);
