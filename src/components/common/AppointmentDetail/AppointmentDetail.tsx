import * as React from 'react';
import { connect } from 'react-redux';
import { floatToTime } from 'utils/functions';
import { withRouter } from 'react-router-dom';
import styles from './styles.module.css';
import { makeAppointment } from 'redux/stores/auth/action';
import { subjectStoreClear } from 'redux/stores/subject/action';
import { tutorStoreClear } from 'redux/stores/tutor/action';
import { dateStoreClear } from 'redux/stores/date/action';

class AppointmentDetail extends React.Component<any, any> {
	handleSubmit = () => {
		const { data, hour, profile, selectedSubject } = this.props;
		let date = new Date(data.date.getTime());
		if (this.props.hour % 1 === 0) {
			date.setHours(Math.floor(hour), 0, 0);
		} else {
			date.setHours(Math.floor(hour), 30, 0);
		}
		const appointment = {
			apptDate: Math.floor(date.getTime() / 1000),
			dateCreated: Math.floor(Date.now() / 1000),
			status: 'pending',
			student_id: profile.uid,
			subject_id: selectedSubject.value,
			time: {
				from: floatToTime(hour),
				to: floatToTime(hour + 0.5)
			},
			tutor_id: data.tutor.uid
		};
		const dataToDb = { appointment, day: date.getDay(), tutor: data.tutor, subject: selectedSubject };
		this.props
			.makeAppointment(dataToDb, profile)
			.then(() => {
				alert('Make appointment successfully. You will receive an email as the confirmation.');
				this.props.history.push('/appointment');
				this.props.subjectStoreClear();
				this.props.tutorStoreClear();
				this.props.dateStoreClear();
			})
			.catch((err: Error) => console.warn(err.message));
	};

	render() {
		const { data, selectedSubject, hour } = this.props;
		return (
			<div>
				<h3 className="alert alert-info">Appointment detail</h3>
				<div className="alert alert-warning">
					<h4>Tutor: {data.tutor.name}</h4>
					<h4>Subject: {selectedSubject.label}</h4>
				</div>
				<div className="alert alert-success">
					<h4>Date: {data.date.toDateString()}</h4>
					<h4>From: {floatToTime(hour)}</h4>
					<h4>To: {floatToTime(hour + 0.5)}</h4>
				</div>
				<div className={styles.btnWrapper}>
					<button className="form-control btn btn-primary" onClick={this.handleSubmit}>
						Make appointment
					</button>
					<button className="form-control btn btn-primary" onClick={this.props.close}>
						Close
					</button>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state: any) => ({
	profile: state.auth.data.profile,
	selectedSubject: state.subject.data.subject
});

const FinalComp = withRouter(AppointmentDetail);

export default connect(mapStateToProps, {
	makeAppointment,
	subjectStoreClear,
	tutorStoreClear,
	dateStoreClear
})(FinalComp);
