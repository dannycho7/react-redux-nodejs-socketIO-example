import React from "react";
import { connect } from "react-redux";

import Form from "./Form";
import { signup } from "../../actions";

const mapStateToProps = () => {

}

const mapDispatchToProps = (dispatch) => {
	return {
		signup: (values, history) => dispatch(signup(values, history))
	};
};

const Signup = ({ match, signup, history }) => {
	return (
		<div>
			<h1>Signup</h1>
			<Form handleSubmit={ (values) => signup(values, history) }/>
		</div>
	);
};

export default connect(null, mapDispatchToProps)(Signup);
