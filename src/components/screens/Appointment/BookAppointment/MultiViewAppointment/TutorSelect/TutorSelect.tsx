import * as React from 'react';
import Select from 'react-select';
import { connect } from 'react-redux';
import { fetchTutorMultiDay, fetchTutor } from 'redux/stores/tutor/action';

class TutorSelect extends React.Component<any, any> {
	componentDidMount() {
		this.props.fetchTutorMultiDay(this.props.selectedSubject.value, this.props.dayOne, this.props.dayTwo);
	}

	componentDidUpdate(prevProps: any) {
		// if (prevProps.dayOne && prevProps.dayTwo) {
		// 	if (
		// 		this.props.dayOne.getTime() !== prevProps.dayOne.getTime() ||
		// 		this.props.dayTwo.getTime() !== prevProps.dayTwo.getTime()
		// 	) {
		// 		this.props.fetchTutorMultiDay(this.props.selectedSubject.value, this.props.dayOne, this.props.dayTwo);
		// 	}
		// }
		if (this.props.dayTwo) {
			if (prevProps.dayTwo) {
				if (
					this.props.dayOne.getTime() !== prevProps.dayOne.getTime() ||
					this.props.dayTwo.getTime() !== prevProps.dayTwo.getTime()
				) {
					this.props.fetchTutorMultiDay(
						this.props.selectedSubject.value,
						this.props.dayOne,
						this.props.dayTwo
					);
				}
			} else {
				this.props.fetchTutorMultiDay(this.props.selectedSubject.value, this.props.dayOne, this.props.dayTwo);
			}
		}
	}

	setTutor = (tutor: any) => this.props.fetchTutor(tutor.value);

	render() {
		return <Select options={this.props.tutors} placeholder="Select tutor..." onChange={this.setTutor} />;
	}
}

const mapStateToProps = (state: any) => ({
	tutors: state.tutor.data.tutors,
	selectedSubject: state.subject.data.subject,
	dayOne: state.date.data.dayOne,
	dayTwo: state.date.data.dayTwo
});

export default connect(mapStateToProps, { fetchTutorMultiDay, fetchTutor })(TutorSelect);
