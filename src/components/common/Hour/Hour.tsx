import * as React from 'react';
import moment from 'moment';
import Modal from 'react-modal';
import { connect } from 'react-redux';
import { floatToTime } from 'utils/functions';
import AppointmentDetail from '../AppointmentDetail/AppointmentDetail';

Modal.setAppElement('#root');

class Hour extends React.Component<any, any> {
	state = { modal: false };

	toggleModal = (type: 'open' | 'close') => () => {
		if (type === 'open') this.setState({ modal: true });
		else this.setState({ modal: false });
	};

	checkVacancy = (hr: any) => {
		let vacancyCurrent = true;
		let vacancyAppt = true;
		const { data } = this.props;
		const timeString = floatToTime(hr);
		const pickedMonth = data.date.getMonth();
		const pickedDate = data.date.getDate();
		for (const day of data.tutor.work_schedule[data.date.getDay()]) {
			if (day.appointments) {
				for (const appt of day.appointments) {
					if (timeString === appt.from) {
						const apptMonth = new Date(appt.date * 1000).getMonth();
						const apptDate = new Date(appt.date * 1000).getDate();
						if (pickedMonth === apptMonth && pickedDate === apptDate) {
							vacancyAppt = false;
							break;
						}
					}
				}
			}
		}

		const currentMoment = Math.floor(new Date().getTime() / 1000);
		// console.log(currentMoment);

		let vacancyOff = true;
		const currentMomentOfHour = Number(
			moment(`${data.date.toLocaleDateString('en-US')} ${timeString}`, 'M/D/YYYY hh:mm A').format('X')
		);
		if (currentMomentOfHour < currentMoment) {
			vacancyCurrent = false;
		}
		// console.log(currentMomentOfHour);
		for (const time of data.tutor.off_time) {
			if (currentMomentOfHour >= time.from && currentMomentOfHour <= time.to) {
				vacancyOff = false;
				break;
			}
		}
		if (vacancyAppt && vacancyCurrent && vacancyOff) return true;
		return false;
	};

	render() {
		const { hour, data } = this.props;
		// console.log(data);
		return (
			<div>
				{this.checkVacancy(hour) ? (
					<p
						className="alert alert-success"
						style={{ ...styles.vacantStyle, textAlign: 'center' }}
						onClick={this.toggleModal('open')}
					>
						{floatToTime(hour)}
					</p>
				) : (
					<p className="alert alert-danger" style={{ ...styles.unVacantStyle, textAlign: 'center' }}>
						{floatToTime(hour)}
					</p>
				)}

				<Modal
					isOpen={this.state.modal}
					style={{
						content: {
							width: '30%',
							margin: 'auto',
							bottom: 'auto'
						}
					}}
				>
					{this.state.modal ? (
						<AppointmentDetail data={data} hour={hour} close={this.toggleModal('close')} />
					) : null}
				</Modal>
			</div>
		);
	}
}

const styles = {
	vacantStyle: {
		cursor: 'pointer',
		borderColor: '#b5d49b',
		backgroundColor: '#c3e3b5',
		width: 128,
		padding: 6,
		margin: 0,
		marginBottom: 8
	},
	unVacantStyle: {
		cursor: 'not-allowed',
		width: 128,
		padding: 6,
		margin: 0,
		marginBottom: 8
	}
};

const mapStateToProps = (state: any) => ({ dates: state.date.data.dates });

export default connect(mapStateToProps, null)(Hour);
