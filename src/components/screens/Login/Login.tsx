import * as React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { login, clearError } from 'redux/stores/auth/action';
import styles from './styles.module.css';

class Login extends React.Component<any, any> {
	state = {
		studentId: ''
	};

	setStudentId = (event: React.FormEvent<HTMLInputElement>) => {
		this.setState({ studentId: event.currentTarget.value });
	};

	handleSubmit = (event: React.FormEvent) => {
		event.preventDefault();
		this.props
			.login(this.state.studentId)
			.then(() => this.props.clearError())
			.catch((err: Error) => console.warn(err.message));
	};

	render() {
		if (this.props.profile) return <Redirect to="/appointment" />;
		return (
			<div className="container">
				<div className="box-form">
					{this.props.error.length ? (
						<div className="alert alert-danger" role="alert">
							{this.props.error}
						</div>
					) : null}

					<form onSubmit={this.handleSubmit}>
						<label>Student ID*</label>
						<div className="form-group">
							<input
								className="form-control"
								type="text"
								placeholder="Enter your ID"
								onChange={this.setStudentId}
							/>
						</div>
						<div className="form-group">
							<button type="submit" className="form-control btn btn-primary">
								Login
							</button>
						</div>
					</form>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state: any) => ({ profile: state.auth.data.profile, error: state.auth.error });

export default connect(mapStateToProps, { login, clearError })(Login);
