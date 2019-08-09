import * as React from 'react';
import { connect } from 'react-redux';
import { performDeleteAppointment } from 'redux/stores/auth/action';
import AppointmentTable from './AppointmentTable/AppointmentTable';
import ReasonInput from './ReasonInput/ReasonInput';
import styles from './styles.module.css';

class ManageAppointment extends React.Component<any, any> {
	handleDelete = () => {
		if (this.props.selectedAppointment) {
			const thingToDelete = {
				tutor_id: this.props.selectedAppointment.tutor_id,
				day: new Date(this.props.selectedAppointment.apptDate * 1000).getDay(),
				appt_id: this.props.selectedAppointment.id,
				reason: this.props.reasonToDeleteAppt
			};
			console.log('test');
			console.log(thingToDelete);
			this.props.performDeleteAppointment(thingToDelete, this.props.profile);
		} else {
			alert('Please select one appointment to delete.');
		}
	};
	render() {
		console.log(this.props.profile);
		return (
			<div className="container">
				<div className="box-form" style={{ width: '80%' }}>
					<AppointmentTable />
					<ReasonInput />
					<div className={styles.btnWrapper}>
						<button className="form-control btn btn-primary" onClick={this.handleDelete}>
							Delete
						</button>
						<button className="form-control btn btn-primary">Back</button>
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state: any) => ({
	profile: state.auth.data.profile,
	reasonToDeleteAppt: state.auth.data.reasonToDeleteAppt,
	selectedAppointment: state.auth.data.selectedAppointment
});

export default connect(mapStateToProps, { performDeleteAppointment })(ManageAppointment);
