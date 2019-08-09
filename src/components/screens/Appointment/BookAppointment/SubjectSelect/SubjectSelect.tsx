import * as React from 'react';
import Select from 'react-select';
import { connect } from 'react-redux';
import { fetchAllSubjects, selectSubject } from 'redux/stores/subject/action';

class SubjectSelect extends React.Component<any, any> {
	state = { selectedSubject: null };

	componentDidMount() {
		this.props.fetchAllSubjects();
	}

	setSubject = (subject: any) => this.props.selectSubject(subject);

	render() {
		return (
			<Select
				options={this.props.subjects}
				placeholder="Select subject..."
				value={this.props.subject}
				onChange={this.setSubject}
				noOptionsMessage={() => 'No subject.'}
			/>
		);
	}
}

const mapStateToProps = (state: any) => ({
	subjects: state.subject.data.subjects,
	subject: state.subject.data.subject
});

export default connect(mapStateToProps, { fetchAllSubjects, selectSubject })(SubjectSelect);
