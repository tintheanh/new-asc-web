import * as React from 'react';
import { connect } from 'react-redux';
import {  } from 'redux/stores/tutor/action';
import { DateSelect, TutorBox } from 'components/common';
import TutorSelect from './TutorSelect/TutorSelect';
import styles from './styles.module.css';

class MultiViewAppointment extends React.Component<any, any> {
	render() {
		const { selectedSubject, tutors, selectedTutor } = this.props;
		// console.log(tutors);
		return (
			<div className="container">
				<div className="box-form" style={{ width: '80%' }}>
					<h3>{`Subject selected: ${selectedSubject.label}`}</h3>
					<div className={styles.datePickWrapper} style={{ marginBottom: 8 }}>
						<div className={styles.datePick}>
							<p>From</p>
							<DateSelect />
						</div>
						<div className={styles.datePick}>
							<p>To</p>
							<DateSelect type="day2" />
						</div>
					</div>
					<div className={styles.tutorSelect}>
						<TutorSelect />
					</div>
					{/* {selectedTutor ? (
						<TutorBox
							key={selectedTutor.uid}
							type="multi"
							hours={selectedTutor.work_schedule}
							tutor={{
								uid: selectedTutor.uid,
								name: selectedTutor.name,
								work_schedule: selectedTutor.work_schedule
							}}
						/>
					) : null} */}
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state: any) => ({
	selectedSubject: state.subject.data.subject,
	dayOne: state.date.data.dayOne,
	tutors: state.tutor.data.tutors,
	selectedTutor: state.tutor.data.selectedTutor
});

export default connect(mapStateToProps, {  })(MultiViewAppointment);
