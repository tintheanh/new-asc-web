import { fbdb } from 'index';
import { AppointmentActionTypes, ActionPayload } from './types';
import { timeStringToFloat } from 'utils/functions';

const getIndex = (arr: any[], time: any) => {
	for (let i = 0; i < arr.length; i++) {
		if (
			timeStringToFloat(time.from) >= timeStringToFloat(arr[i].from) &&
			timeStringToFloat(time.to) <= timeStringToFloat(arr[i].to)
		) {
			return i;
		}
	}
	return -1;
};

export const makeAppointment = (data: any) => (dispatch: (arg: ActionPayload) => void) => {
	return new Promise((resolve, reject) => {
		const newKey = fbdb.ref('appointments').push().key;
		if (newKey) {
			fbdb
				.ref('appointments')
				.child(newKey)
				.set(data.appointment)
				.then(() => {
					const index = getIndex(data.tutor.work_schedule[data.day], data.appointment.time);
					if (index >= 0) {
						fbdb
							.ref(`tutors/${data.appointment.tutor_id}/work_schedule/${data.day}/${index}/appointments`)
							.child(newKey)
							.set({ ...data.appointment.time, date: data.appointment.apptDate })
							.then(() => {
								dispatch({
									type: AppointmentActionTypes.MAKE_SUCCESS,
									payload: {
										data: null,
										error: ''
									}
								});
								resolve();
							})
							.catch((err) => {
								dispatch({
									type: AppointmentActionTypes.MAKE_FAILURE,
									payload: {
										data: null,
										error: err.message
									}
								});
								reject(err);
							});
					} else {
						dispatch({
							type: AppointmentActionTypes.MAKE_FAILURE,
							payload: {
								data: null,
								error: 'Error occurred when making appointment.'
							}
						});
						reject(new Error('Error occurred when making appointment.'));
					}
				})
				.catch((err) => {
					dispatch({
						type: AppointmentActionTypes.MAKE_FAILURE,
						payload: {
							data: null,
							error: err.message
						}
					});
					reject(err);
				});
		} else {
			dispatch({
				type: AppointmentActionTypes.MAKE_FAILURE,
				payload: {
					data: null,
					error: 'Error occurred when making appointment.'
				}
			});
			reject(new Error('Error occurred when making appointment.'));
		}
	});
};

export const appointmentStoreClear = () => (dispatch: (arg: ActionPayload) => void) => {
	dispatch({
		type: AppointmentActionTypes.CLEAR,
		payload: {
			data: null,
			error: ''
		}
	});
};
