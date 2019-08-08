import * as React from 'react';
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
		const timeString = floatToTime(hr);
		const pickedMonth = this.props.data.date.getMonth();
		const pickedDate = this.props.data.date.getDate();
		for (const day of this.props.data.tutor.work_schedule[this.props.data.date.getDay()]) {
			if (day.appointments) {
				for (const app of day.appointments) {
					if (timeString === app.from) {
						const apptMonth = new Date(app.date * 1000).getMonth();
						const apptDate = new Date(app.date * 1000).getDate();
						if (pickedMonth === apptMonth && pickedDate === apptDate) {
							return false;
						}
					}
				}
			}
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

				{/* <p
					className="alert alert-success"
					style={{ ...styles.vacantStyle, textAlign: 'center' }}
					onClick={this.toggleModal('open')}
				>
					{floatToTime(this.props.hour)}
				</p> */}

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
						<AppointmentDetail
							data={this.props.data}
							hour={this.props.hour}
							close={this.toggleModal('close')}
						/>
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

const mapStateToProps = (state: any) => ({ dayOne: state.date.data.dayOne, dates: state.date.data.dates });

export default connect(mapStateToProps, null)(Hour);
