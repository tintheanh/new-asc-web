import * as React from 'react';
import { connect } from 'react-redux';
import { fetchTutors } from 'redux/stores/tutor/action';
import DateSelect from '../DateSelect/DateSelect';
import TutorHours from './TutorHours/TutorHours';

class SingleViewAppointment extends React.Component<any, any> {
	componentDidMount() {
		this.props.fetchTutors(this.props.selectedSubject.value, this.props.selectedDate.getDay());
	}

	componentDidUpdate(prevProps: any) {
		if (this.props.selectedDate.getTime() !== prevProps.selectedDate.getTime()) {
			this.props.fetchTutors(this.props.selectedSubject.value, this.props.selectedDate.getDay());
		}
	}

	render() {
		// console.log(this.props.selectedDate.getDay());
		console.log(this.props.tutors);
		return (
			<div className="container">
				<div className="box-form" style={{ width: '80%' }}>
					<h3>{`Subject selected: ${this.props.selectedSubject.label}`}</h3>
					<div style={{ width: '30%', marginBottom: 8 }}>
						<p>Select a date</p>
						<DateSelect />
					</div>

					{this.props.tutors.length ? (
						this.props.tutors.map((tutor: any) => (
							<div key={tutor.uid} style={{ marginTop: 18 }}>
								<h4>{tutor.name}</h4>
								<TutorHours
									hours={tutor.work_schedule[this.props.selectedDate.getDay()]}
									tutor={{ uid: tutor.uid, name: tutor.name, work_schedule: tutor.work_schedule }}
								/>
							</div>
						))
					) : (
						<div className="alert alert-danger">No tutor is available during the selected date period.</div>
					)}
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state: any) => ({
	selectedSubject: state.subject.data.subject,
	selectedDate: state.tutor.data.selectedDate,
	tutors: state.tutor.data.tutors
});

export default connect(mapStateToProps, { fetchTutors })(SingleViewAppointment);
