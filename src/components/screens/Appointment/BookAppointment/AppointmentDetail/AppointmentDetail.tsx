import * as React from 'react';
import { connect } from 'react-redux';
import { floatToTime } from 'utils/functions';
import { withRouter } from 'react-router-dom';
import styles from './styles.module.css';
import { makeAppointment, appointmentStoreClear } from 'redux/stores/appointment/action';
import { subjectStoreClear } from 'redux/stores/subject/action';
import { tutorStoreClear } from 'redux/stores/tutor/action';

const options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };

class AppointmentDetail extends React.Component<any, any> {
	handleSubmit = () => {
		if (this.props.hour % 1 === 0) {
			this.props.selectedDate.setHours(Math.floor(this.props.hour), 0, 0);
		} else {
			this.props.selectedDate.setHours(Math.floor(this.props.hour), 30, 0);
		}

		const appointment = {
			apptDate: Math.floor(this.props.selectedDate.getTime() / 1000),
			dateCreated: Math.floor(Date.now() / 1000),
			status: 'pending',
			student_id: this.props.profile.uid,
			subject_id: this.props.selectedSubject.value,
			time: {
				from: floatToTime(this.props.hour),
				to: floatToTime(this.props.hour + 0.5)
			},
			tutor_id: this.props.tutor.uid
		};

		const data = { appointment, day: this.props.selectedDate.getDay(), tutor: this.props.tutor };
		this.props
			.makeAppointment(data)
			.then(() => {
				alert('Make appointment successfully. You will receive an email as the confirmation.');
				this.props.history.push('/appointment');
				this.props.appointmentStoreClear();
				this.props.subjectStoreClear();
				this.props.tutorStoreClear();
			})
			.catch((err: Error) => console.warn(err.message));
	};

	render() {
		return (
			<div>
				<h3 className="alert alert-info">Appointment detail</h3>
				<div className="alert alert-warning">
					<h4>Tutor: {this.props.tutor.name}</h4>
					<h4>Subject: {this.props.selectedSubject.label}</h4>
				</div>
				<div className="alert alert-success">
					<h4>Date: {this.props.selectedDate.toLocaleDateString('en-US', options)}</h4>
					<h4>From: {floatToTime(this.props.hour)}</h4>
					<h4>To: {floatToTime(this.props.hour + 0.5)}</h4>
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
	selectedDate: state.tutor.data.selectedDate,
	selectedSubject: state.subject.data.subject
});

const FinalComp = withRouter(AppointmentDetail);

export default connect(mapStateToProps, { makeAppointment, appointmentStoreClear, subjectStoreClear, tutorStoreClear })(
	FinalComp
);
