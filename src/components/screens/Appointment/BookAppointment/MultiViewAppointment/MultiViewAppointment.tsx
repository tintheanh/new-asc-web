import * as React from 'react';
import { connect } from 'react-redux';
import {} from 'redux/stores/tutor/action';
import { DateSelect, TutorBox } from 'components/common';
import { contains } from 'utils/functions';
import TutorSelect from './TutorSelect/TutorSelect';
import styles from './styles.module.css';

class MultiViewAppointment extends React.Component<any, any> {
	_filterDates = () => {
		const { selectedTutor, datesWithTutors } = this.props;
		if (selectedTutor) {
			const filtered = datesWithTutors
				.map((date: any) => {
					if (contains(date.tutors, selectedTutor, 'uid')) {
						const tutors = date.tutors.filter((tutor: any) => tutor.uid === selectedTutor.uid);
						return {
							date: date.date,
							tutors
						};
					}
					return null;
				})
				.filter((data: any) => data !== null);
			return filtered;
		}
		return [];
	};

	render() {
		const { selectedSubject, selectedTutor } = this.props;
		console.log(this.props.datesWithTutors);
		return (
			<div className="container">
				<div className="box-form" style={{ width: '80%' }}>
					{selectedSubject ? <h3>{`Subject selected: ${selectedSubject.label}`}</h3> : null}
					<div className={styles.datePickWrapper} style={{ marginBottom: 8 }}>
						<div className={styles.datePick}>
							<p>From</p>
							<DateSelect hasMax />
						</div>
						<div className={styles.datePick}>
							<p>To</p>
							<DateSelect type="day2" />
						</div>
					</div>
					<div className={styles.tutorSelect}>
						<TutorSelect />
					</div>
					{selectedTutor ? (
						<div>
							<h4>{selectedTutor.name}</h4>
							{this._filterDates().map((date: any) => {
								return date.tutors.map((tutor: any, i: number) => (
									<TutorBox key={i} hideName type="single" data={{ date: date.date, tutor: tutor }} />
								));
							})}
						</div>
					) : null}
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state: any) => ({
	selectedSubject: state.subject.data.subject,
	datesWithTutors: state.tutor.data.datesWithTutors,
	selectedTutor: state.tutor.data.selectedTutor
});

export default connect(mapStateToProps, {})(MultiViewAppointment);
