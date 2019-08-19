import { auth, fsdb, fbdb } from 'index';
import { AuthActionTypes, ActionPayload } from './types';
import { timeStringToFloat } from 'utils/functions';

const getIndex = (arr: any[], time: any) => {
	for (let i = 0; i < arr.length; i++) {
		if (
			timeStringToFloat(time.from) >= timeStringToFloat(arr[i].from.time) &&
			timeStringToFloat(time.to) <= timeStringToFloat(arr[i].to.time)
		) {
			return i;
		}
	}
	return -1;
};

const getShift = (workDay: any[], appt_id: string) => {
	for (let i = 0; i < workDay.length; i++) {
		if (workDay[i].appointments) {
			if (workDay[i].appointments[appt_id]) {
				return i;
			}
		}
	}
	return -1;
};

export const makeAppointment = (data: any, profile: any, appointments: any[]) => (
	dispatch: (arg: ActionPayload) => void
) => {
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
								const emailData = {
									tutorName: data.tutor.name,
									tutorEmail: data.tutor.email,
									studentName: `${profile.first_name} ${profile.last_name}`,
									studentEmail: profile.email,
									subject: data.subject.label,
									date: new Date(data.appointment.apptDate * 1000).toDateString(),
									timeFrom: data.appointment.time.from,
									timeTo: data.appointment.time.to
								};
								fetch(
									'https://us-central1-asc-management-app.cloudfunctions.net/sendMailForMakingAppointment',
									{
										method: 'POST',
										headers: {
											'Content-Type': 'application/json'
										},
										body: JSON.stringify(emailData)
									}
								)
									.then((_) => {
										dispatch({
											type: AuthActionTypes.MAKE_APPOINTMENT_SUCCESS,
											payload: {
												data: {
													profile: null,
													appointments: [],
													selectedAppointment: null,
													reasonToDeleteAppt: ''
												},
												error: ''
											}
										});
										resolve();
									})
									.catch((err) => {
										dispatch({
											type: AuthActionTypes.MAKE_APPOINTMENT_FAILURE,
											payload: {
												data: {
													profile: null,
													appointments: [],
													selectedAppointment: null,
													reasonToDeleteAppt: ''
												},
												error: err.message
											}
										});
										reject(err);
									});
							})
							.catch((err) => {
								dispatch({
									type: AuthActionTypes.MAKE_APPOINTMENT_FAILURE,
									payload: {
										data: {
											profile: null,
											appointments: [],
											selectedAppointment: null,
											reasonToDeleteAppt: ''
										},
										error: err.message
									}
								});
								reject(err);
							});
					} else {
						dispatch({
							type: AuthActionTypes.MAKE_APPOINTMENT_FAILURE,
							payload: {
								data: {
									profile: null,
									appointments: [],
									selectedAppointment: null,
									reasonToDeleteAppt: ''
								},
								error: 'Error occurred when making appointment.'
							}
						});
						reject(new Error('Error occurred when making appointment.'));
					}
				})
				.catch((err) => {
					dispatch({
						type: AuthActionTypes.MAKE_APPOINTMENT_FAILURE,
						payload: {
							data: {
								profile: null,
								appointments: [],
								selectedAppointment: null,
								reasonToDeleteAppt: ''
							},
							error: err.message
						}
					});
					reject(err);
				});
		} else {
			dispatch({
				type: AuthActionTypes.MAKE_APPOINTMENT_FAILURE,
				payload: {
					data: {
						profile: null,
						appointments: [],
						selectedAppointment: null,
						reasonToDeleteAppt: ''
					},
					error: 'Error occurred when making appointment.'
				}
			});
			reject(new Error('Error occurred when making appointment.'));
		}
	});
};

export const fetchAppointment = (uid: string) => async (dispatch: (arg: ActionPayload) => void) => {
	try {
		const appointmentSnapshot = await fbdb.ref('appointments').once('value');
		const apptObj = appointmentSnapshot.val();

		if (apptObj) {
			const appts = await Promise.all(
				Object.keys(apptObj).map(async (key) => {
					const [ tutorRef, subjectRef ] = await Promise.all([
						fsdb.collection('tutors').doc(apptObj[key].tutor_id).get(),
						fsdb.collection('subjects').doc(apptObj[key].subject_id).get()
					]);
					return {
						id: key,
						student_id: apptObj[key].student_id,
						tutor: `${tutorRef.data()!.first_name} ${tutorRef.data()!.last_name}`,
						tutor_id: apptObj[key].tutor_id,
						tutorEmail: tutorRef.data()!.email,
						subject: `${subjectRef.data()!.label} - ${subjectRef.data()!.full}`,
						apptDate: apptObj[key].apptDate,
						time: apptObj[key].time
					};
				})
			);

			const studentAppts = appts.filter((appt: any) => appt.student_id === uid);
			console.log(studentAppts);
			dispatch({
				type: AuthActionTypes.FETCH_APPOINTMENT_SUCCESS,
				payload: {
					data: {
						profile: null,
						appointments: studentAppts,
						selectedAppointment: null,
						reasonToDeleteAppt: ''
					},
					error: ''
				}
			});
		} else {
			dispatch({
				type: AuthActionTypes.FETCH_APPOINTMENT_FAILURE,
				payload: {
					data: {
						profile: null,
						appointments: [],
						selectedAppointment: null,
						reasonToDeleteAppt: ''
					},
					error: 'Error occurred.'
				}
			});
		}
	} catch (err) {
		dispatch({
			type: AuthActionTypes.FETCH_APPOINTMENT_FAILURE,
			payload: {
				data: {
					profile: null,
					appointments: [],
					selectedAppointment: null,
					reasonToDeleteAppt: ''
				},
				error: err.message
			}
		});
	}
};

export const login = (uid: string) => (dispatch: (arg: ActionPayload) => void) => {
	return new Promise((resolve, reject) => {
		if (uid.length) {
			auth
				.signInWithEmailAndPassword(`${uid}@asc.com`, 'asc1234')
				.then(async () => {
					const user = auth.currentUser;
					if (user) {
						try {
							const studentRef = await fsdb.collection('students').doc(user.uid).get();
							const data = studentRef.data();

							if (studentRef.exists && data) {
								const profile = {
									uid: studentRef.id,
									email: data.email,
									first_name: data.first_name,
									last_name: data.last_name,
									studentId: data.studentId
								};
								dispatch({
									type: AuthActionTypes.LOGIN_SUCCESS,
									payload: {
										data: {
											profile: profile,
											appointments: [],
											selectedAppointment: null,
											reasonToDeleteAppt: ''
										},
										error: ''
									}
								});
								resolve();
							} else {
								dispatch({
									type: AuthActionTypes.LOGIN_FAILURE,
									payload: {
										data: {
											profile: null,
											appointments: [],
											selectedAppointment: null,
											reasonToDeleteAppt: ''
										},
										error: 'Could not find data.'
									}
								});
								reject(new Error('Could not find data.'));
							}
						} catch (err) {
							dispatch({
								type: AuthActionTypes.LOGIN_FAILURE,
								payload: {
									data: {
										profile: null,
										appointments: [],
										selectedAppointment: null,
										reasonToDeleteAppt: ''
									},
									error: err.message
								}
							});
							reject(err);
						}
					} else {
						dispatch({
							type: AuthActionTypes.LOGIN_FAILURE,
							payload: {
								data: {
									profile: null,
									appointments: [],
									selectedAppointment: null,
									reasonToDeleteAppt: ''
								},
								error: 'Could not login.'
							}
						});
						reject(new Error('Could not login.'));
					}
				})
				.catch((err) => {
					dispatch({
						type: AuthActionTypes.LOGIN_FAILURE,
						payload: {
							data: {
								profile: null,
								appointments: [],
								selectedAppointment: null,
								reasonToDeleteAppt: ''
							},
							error: err.message
						}
					});
					reject(err);
				});
		} else {
			dispatch({
				type: AuthActionTypes.LOGIN_FAILURE,
				payload: {
					data: {
						profile: null,
						appointments: [],
						selectedAppointment: null,
						reasonToDeleteAppt: ''
					},
					error: 'ID cannot be blank.'
				}
			});
			reject(new Error('ID cannot be blank.'));
		}
	});
};

export const logout = () => (dispatch: (arg: ActionPayload) => void) => {
	auth
		.signOut()
		.then(() =>
			dispatch({
				type: AuthActionTypes.LOGOUT_SUCCESS,
				payload: {
					data: {
						profile: null,
						appointments: [],
						selectedAppointment: null,
						reasonToDeleteAppt: ''
					},
					error: ''
				}
			})
		)
		.catch((err) =>
			dispatch({
				type: AuthActionTypes.LOGOUT_FAILURE,
				payload: {
					data: {
						profile: null,
						appointments: [],
						selectedAppointment: null,
						reasonToDeleteAppt: ''
					},
					error: err.message
				}
			})
		);
};

export const selectAppointment = (appointment: any) => (dispatch: (arg: ActionPayload) => void) => {
	dispatch({
		type: AuthActionTypes.SELECT_APPOINTMENT,
		payload: {
			data: {
				profile: null,
				appointments: [],
				selectedAppointment: appointment,
				reasonToDeleteAppt: ''
			},
			error: ''
		}
	});
};

export const inputReason = (reason: any) => (dispatch: (arg: ActionPayload) => void) => {
	dispatch({
		type: AuthActionTypes.INPUT_REASON,
		payload: {
			data: {
				profile: null,
				appointments: [],
				selectedAppointment: null,
				reasonToDeleteAppt: reason
			},
			error: ''
		}
	});
};

export const deleteAppointment = (data: any) => (dispatch: (arg: ActionPayload) => void) => {
	const { thingToDelete, oldAppointments, forEmail } = data;
	const { tutor_id, appt_id, day } = thingToDelete;

	fbdb.ref(`appointments/${appt_id}`).remove().then(async () => {
		const workDayRef = await fbdb.ref(`tutors/${tutor_id}/work_schedule/${day}`).once('value');
		const workDay = workDayRef.val();

		const index = getShift(workDay, appt_id);
		if (index > -1) {
			fbdb
				.ref(`tutors/${tutor_id}/work_schedule/${day}/${index}/appointments/${appt_id}`)
				.remove()
				.then(() => {
					fetch('https://us-central1-asc-management-app.cloudfunctions.net/sendMailForDeletingAppointment', {
						method: 'POST',
						headers: {
							'Content-Type': 'application/json'
						},
						body: JSON.stringify(forEmail)
					})
						.then((_) => {
							const appointments = [ ...oldAppointments ];
							const newAppointments = appointments.filter(
								(appt: any) => appt.id !== thingToDelete.appt_id
							);

							dispatch({
								type: AuthActionTypes.DELETE_APPOINTMENT_SUCCESS,
								payload: {
									data: {
										profile: null,
										appointments: newAppointments,
										selectedAppointment: null,
										reasonToDeleteAppt: ''
									},
									error: ''
								}
							});
						})
						.catch((err) => {
							dispatch({
								type: AuthActionTypes.DELETE_APPOINTMENT_FAILURE,
								payload: {
									data: {
										profile: null,
										appointments: [],
										selectedAppointment: null,
										reasonToDeleteAppt: ''
									},
									error: err.message
								}
							});
						});
				})
				.catch((err) =>
					dispatch({
						type: AuthActionTypes.DELETE_APPOINTMENT_FAILURE,
						payload: {
							data: {
								profile: null,
								appointments: [],
								selectedAppointment: null,
								reasonToDeleteAppt: ''
							},
							error: err.message
						}
					})
				);
		} else {
			dispatch({
				type: AuthActionTypes.DELETE_APPOINTMENT_FAILURE,
				payload: {
					data: {
						profile: null,
						appointments: [],
						selectedAppointment: null,
						reasonToDeleteAppt: ''
					},
					error: 'Could not find shift index.'
				}
			});
		}
	});
};

export const clearAuthStore = () => (dispatch: (arg: ActionPayload) => void) => {
	dispatch({
		type: AuthActionTypes.CLEAR_STORE,
		payload: {
			data: {
				profile: null,
				appointments: [],
				selectedAppointment: null,
				reasonToDeleteAppt: ''
			},
			error: ''
		}
	});
};

export const clearError = () => (dispatch: (arg: ActionPayload) => void) => {
	dispatch({
		type: AuthActionTypes.CLEAR_ERROR,
		payload: {
			data: {
				profile: null,
				appointments: [],
				selectedAppointment: null,
				reasonToDeleteAppt: ''
			},
			error: ''
		}
	});
};
