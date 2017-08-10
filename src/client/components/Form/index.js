import React from "react";

class Form extends React.Component {
	constructor() {
		super();

		this.state = {
			message: ""
		};
		this.onSubmit = this.onSubmit.bind(this);
		this.handleChange = this.handleChange.bind(this);
	}

	onSubmit(evt) {
		evt.preventDefault();
		const { onSubmit } = this.props;
		if(onSubmit) {
			onSubmit({
				message: this.state.message
			});
		}
	}

	handleChange(evt) {
		this.setState({
			message: evt.target.value
		})
	}

	render() {
		return (
			<form action="/" onSubmit={this.onSubmit}>
				<input type="text" name="message" onChange={this.handleChange} value={this.state.message} />
				<button type="submit">Send Message</button>
			</form>
		);
	}
};

export default Form;