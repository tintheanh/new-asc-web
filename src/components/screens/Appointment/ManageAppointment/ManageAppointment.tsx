import * as React from 'react';
import { connect } from 'react-redux';
import { fetchAppointment, deleteAppointment, clearAuthStore } from 'redux/stores/auth/action';
import AppointmentTable from './AppointmentTable/AppointmentTable';
import ReasonInput from './ReasonInput/ReasonInput';
import styles from './styles.module.css';

class ManageAppointment extends React.Component<any, any> {
	componentDidMount() {
		this.props.fetchAppointment(this.props.profile.uid);
	}

	handleDelete = () => {
		const {appointments, selectedAppointment, profile } = this.props;
		if (selectedAppointment) {
			const data = {
				thingToDelete: {
					tutor_id: selectedAppointment.tutor_id,
					day: new Date(selectedAppointment.apptDate * 1000).getDay(),
					appt_id: selectedAppointment.id
				},
				oldAppointments: appointments,
				forEmail: {
					tutorName: selectedAppointment.tutor,
					tutorEmail: selectedAppointment.tutorEmail,
					studentName: `${profile.first_name} ${profile.last_name}`,
					studentEmail: profile.email,
					subject: selectedAppointment.subject,
					date: new Date(selectedAppointment.apptDate * 1000).toDateString(),
					timeFrom: selectedAppointment.time.from,
					timeTo: selectedAppointment.time.to,
					reason: this.props.reasonToDeleteAppt
				}
			};
			if (window.confirm('Are you sure to delete this appointment?')) {
				this.props.deleteAppointment(data);
			}
		} else {
			alert('Please select one appointment to delete.');
		}
	};

	navigateBack = () => {
		this.props.history.push('/appointment');
		this.props.clearAuthStore();
	};

	render() {
		console.log(this.props.appointments);
		return (
			<div className="container">
				<div className="box-form" style={{ width: '80%' }}>
					<AppointmentTable />
					<ReasonInput />
					<div className={styles.btnWrapper}>
						<button className="form-control btn btn-primary" onClick={this.handleDelete}>
							Delete
						</button>
						<button className="form-control btn btn-primary" onClick={this.navigateBack}>
							Back
						</button>
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state: any) => ({
	appointments: state.auth.data.appointments,
	profile: state.auth.data.profile,
	reasonToDeleteAppt: state.auth.data.reasonToDeleteAppt,
	selectedAppointment: state.auth.data.selectedAppointment
});

export default connect(mapStateToProps, { fetchAppointment, deleteAppointment, clearAuthStore })(ManageAppointment);
