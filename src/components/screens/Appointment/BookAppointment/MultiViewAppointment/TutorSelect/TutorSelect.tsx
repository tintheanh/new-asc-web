import * as React from 'react';
import Select from 'react-select';
import { connect } from 'react-redux';
import { fetchTutors, selectTutor } from 'redux/stores/tutor/action';

class TutorSelect extends React.Component<any, any> {
	componentDidMount() {
		this._fetch();
	}

	componentDidUpdate(prevProps: any) {
		if (this.props.dates.length !== prevProps.dates.length) {
			this._fetch();
		}
	}

	_fetch = () => {
		const { fetchTutors, selectedSubject, dates } = this.props;
		fetchTutors(selectedSubject.value, dates);
	};

	_gatherTutor = () => {
		const { datesWithTutors } = this.props;
		const tutors: any[] = [];
		datesWithTutors.forEach((date: any) => {
			date.tutors.forEach((tutor: any) => {
				if (!tutors.filter((tt: any) => tt.value.uid === tutor.uid).length) {
					tutors.push({
						label: tutor.name,
						value: tutor
					});
				}
			});
		});
		return tutors;
	};

	setTutor = (tutor: any) => this.props.selectTutor(tutor.value);

	render() {
		return (
			<Select
				options={this._gatherTutor()}
				placeholder="Select tutor..."
				onChange={this.setTutor}
				noOptionsMessage={() => 'No tutor.'}
			/>
		);
	}
}

const mapStateToProps = (state: any) => ({
	datesWithTutors: state.tutor.data.datesWithTutors,
	selectedSubject: state.subject.data.subject,
	dates: state.date.data.dates,
	selectedTutor: state.tutor.data.selectedTutor
});

export default connect(mapStateToProps, { fetchTutors, selectTutor })(TutorSelect);
