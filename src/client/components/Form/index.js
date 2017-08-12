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
		const { message } = this.state;
		const { onSubmit } = this.props;

		onSubmit({ message });
		
		this.setState({
			message: ""
		});
	}

	handleChange(evt) {
		this.setState({
			message: evt.target.value
		});
	}

	render() {
		const { action_name } = this.props;
		return (
			<form action="/" onSubmit={this.onSubmit}>
				<input type="text" name="message" onChange={this.handleChange} value={this.state.message} />
				<button type="submit">{action_name}</button>
			</form>
		);
	}
}

export default Form;