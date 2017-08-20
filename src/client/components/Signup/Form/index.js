import React, { Component } from "react";

const initialState = {
	username: "",
	password: ""
};

class Form extends Component {
	constructor() {
		super();

		this.state = initialState;

		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleSubmit(evt) {
		evt.preventDefault();

		const { handleSubmit } = this.props;
		this.resetForm();
		handleSubmit(this.state);
	}

	resetForm() {
		this.setState(initialState);
	}

	render() {
		return (
			<form onSubmit={this.handleSubmit}>
				<div>
					<label htmlFor="username">Username: </label>
					<input
						type="text"
						name="username"
						value={this.state.username}
						onChange={(evt) => this.setState({ username: evt.target.value })}
					/>
				</div>
				<div>
					<label htmlFor="password">Password: </label>
					<input
						type="password"
						name="password"
						value={this.state.password}
						onChange={(evt) => this.setState({ password: evt.target.value })}
					/>
				</div>
				<input type="submit" />
			</form>
		);
	}
};

export default Form;
