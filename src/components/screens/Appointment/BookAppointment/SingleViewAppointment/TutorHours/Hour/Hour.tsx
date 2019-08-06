import * as React from 'react';
import Modal from 'react-modal';
import { connect } from 'react-redux';
import { floatToTime } from 'utils/functions';
import AppointmentDetail from '../../../AppointmentDetail/AppointmentDetail';

Modal.setAppElement('#root');

class Hour extends React.Component<any, any> {
	state = { modal: false };

	toggleModal = (type: 'open' | 'close') => () => {
		if (type === 'open') this.setState({ modal: true });
		else this.setState({ modal: false });
	};

	checkVacancy = (hr: any) => {
		const timeString = floatToTime(hr);
		for (const day of this.props.tutor.work_schedule[this.props.selectedDate.getDay()]) {
			if (day.appointments) {
				for (const app of day.appointments) {
					const pickedMonth = this.props.selectedDate.getMonth();
					const apptMonth = new Date(app.date * 1000).getMonth();
					const pickedDate = this.props.selectedDate.getDate();
					const apptDate = new Date(app.date * 1000).getDate();
					if (timeString === app.from && (pickedMonth === apptMonth && pickedDate === apptDate)) {
						return false;
					}
				}
			}
			return true;
		}
		return true;
	};

	render() {
		return (
			<div>
				{this.checkVacancy(this.props.hour) ? (
					<p
						className="alert alert-success"
						style={{ ...styles.vacantStyle, textAlign: 'center' }}
						onClick={this.toggleModal('open')}
					>
						{floatToTime(this.props.hour)}
					</p>
				) : (
					<p className="alert alert-danger" style={{ ...styles.unVacantStyle, textAlign: 'center' }}>
						{floatToTime(this.props.hour)}
					</p>
				)}

				<Modal
					isOpen={this.state.modal}
					onRequestClose={this.toggleModal('close')}
					style={{
						content: {
							width: '30%',
							margin: 'auto',
							bottom: 'auto'
						}
					}}
				>
					<AppointmentDetail
						tutor={this.props.tutor}
						hour={this.props.hour}
						close={this.toggleModal('close')}
					/>
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

const mapStateToProps = (state: any) => ({ selectedDate: state.tutor.data.selectedDate });

export default connect(mapStateToProps, null)(Hour);