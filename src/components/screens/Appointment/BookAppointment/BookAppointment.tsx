import * as React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import SubjectSelect from './SubjectSelect/SubjectSelect';
import ViewStyleSelect from './ViewTypeSelect/ViewStyleSelect';

class BookAppointment extends React.Component<any, any> {
	handleSubmit = (event: React.FormEvent) => {
		event.preventDefault();
		if (this.props.selectedSubject) {
			if (this.props.selectedType === 'single') this.props.history.push('/appointment/book/single-view');
			else this.props.history.push('/appointment/book/multi-view');
		} else {
			alert('Please select a subject.');
		}
	};

	render() {
		return (
			<div className="container">
				<h2 className="text-center">Select subject</h2>
				<div className="box-form">
					<form onSubmit={this.handleSubmit}>
						<div className="form-group">
							<SubjectSelect />
							<ViewStyleSelect />
						</div>
						<div className="form-group btn-margin" style={{ marginBottom: 8 }}>
							<input className="btn btn-primary form-control" type="submit" />
						</div>
						<Link to="/appointment" className="btn btn-primary form-control" style={{ marginBottom: 8 }}>
							Back
						</Link>
					</form>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state: any) => ({
	selectedType: state.tutor.data.selectedType,
	selectedSubject: state.subject.data.subject
});

export default connect(mapStateToProps, null)(BookAppointment);
