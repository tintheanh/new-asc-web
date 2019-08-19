import * as React from 'react';
import ReactTable from 'react-table';
import { connect } from 'react-redux';
import { convertTimestamp } from 'utils/functions';
import { selectAppointment } from 'redux/stores/auth/action';

class AppointmentTable extends React.Component<any, any> {
	performSelectAppointment = (appointment: any) => () => this.props.selectAppointment(appointment);
	render() {
		const columns = [
			{
				Header: 'Tutor',
				accessor: 'tutor'
			},
			{
				Header: 'Subject',
				accessor: 'subject'
			},
			{
				id: 'date',
				Header: 'Date',
				accessor: (d: any) => convertTimestamp(d.apptDate)
			}
		];
		const { appointments, selectedAppointment } = this.props;
		return (
			<ReactTable
				style={{ cursor: 'pointer' }}
				columns={columns}
				defaultPageSize={10}
				data={appointments}
				noDataText="No appointments found."
				defaultSorted={[
					{
						id: 'date',
						desc: false
					}
				]}
				getTrProps={(_: any, rowInfo: any) => {
					if (rowInfo && rowInfo.row) {
						const appointment = rowInfo.original;
						if (selectedAppointment) {
							return {
								onClick: this.performSelectAppointment(appointment),
								style: {
									background: rowInfo.original.id === selectedAppointment.id ? '#00afec' : 'none',
									color: rowInfo.original.id === selectedAppointment.id ? 'white' : 'black'
								}
							};
						}
						return {
							onClick: this.performSelectAppointment(appointment)
						};
					} else {
						return {};
					}
				}}
			/>
		);
	}
}

const mapStateToProps = (state: any) => ({
	appointments: state.auth.data.appointments,
	selectedAppointment: state.auth.data.selectedAppointment
});

export default connect(mapStateToProps, { selectAppointment })(AppointmentTable);
