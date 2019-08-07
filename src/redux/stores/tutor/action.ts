import { fbdb, fsdb } from 'index';
import { TutorActionTypes, ActionPayload } from './types';
import { sort, traverseWeekdays } from 'utils/functions';

export const selectType = (type: string) => (dispatch: (arg: ActionPayload) => void) => {
	dispatch({
		type: TutorActionTypes.SELECT_TYPE,
		payload: {
			data: {
				selectedType: type,
				tutors: [],
				selectedTutor: null
			},
			error: ''
		}
	});
};

export const fetchTutorsOneDay = (subjectId: string, day: number) => async (dispatch: (arg: ActionPayload) => void) => {
	try {
		const tutorsWithSubject = await fsdb.collection('tutors').where('subjects', 'array-contains', subjectId).get();
		const tutors = await Promise.all(
			tutorsWithSubject.docs.map(async (tutor) => {
				const tutorFb = await fbdb.ref(`tutors/${tutor.id}`).once('value');
				if (tutorFb.val() && tutorFb.val().work_schedule) {
					if (tutorFb.val().work_schedule[day] !== 'none') {
						const processWorkSchedule = tutorFb.val().work_schedule.map((dayOfWeek: any) => {
							if (dayOfWeek !== 'none') {
								return dayOfWeek.map((d: any) => {
									if (d.appointments) {
										const apps = Object.keys(d.appointments).map((appId: string) => {
											return {
												date: d.appointments[appId].date,
												from: d.appointments[appId].from,
												to: d.appointments[appId].to
											};
										});
										return {
											appointments: apps,
											from: d.from,
											to: d.to
										};
									}
									return d;
								});
							}
							return 'none';
						});
						const finalTutor = {
							uid: tutor.id,
							name: `${tutor.data().first_name} ${tutor.data().last_name}`,
							work_schedule: processWorkSchedule
						};
						return finalTutor;
					}
				}
			})
		);
		const finals = tutors.filter((doc) => doc !== undefined);

		dispatch({
			type: TutorActionTypes.FETCH_TUTOR_ONE_SUCCESS,
			payload: {
				data: {
					selectedType: '',
					tutors: finals,
					selectedTutor: null
				},
				error: ''
			}
		});
	} catch (err) {
		dispatch({
			type: TutorActionTypes.FETCH_TUTOR_ONE_FAILURE,
			payload: {
				data: {
					selectedType: '',
					tutors: [],
					selectedTutor: null
				},
				error: err.message
			}
		});
	}
};

export const fetchTutorMultiDay = (subjectId: string, day1: Date, day2: Date) => async (
	dispatch: (arg: ActionPayload) => void
) => {
	if (day1 && day2) {
		const type =
			day1.getDate() === day2.getDate() &&
			day1.getMonth() === day2.getMonth() &&
			day1.getFullYear() === day2.getFullYear();
		const weekdays = traverseWeekdays(day1.getDay(), day2.getDay(), type);
		try {
			// TODO: Find a better way
			const tutorsWithSubject = await fsdb
				.collection('tutors')
				.where('subjects', 'array-contains', subjectId)
				.get();

			const promise = new Promise((resolve, _) => {
				const tutors: any[] = [];
				weekdays.forEach((day) => {
					tutorsWithSubject.docs.forEach(async (tutor, index, array) => {
						const tutorFb = await fbdb.ref(`tutors/${tutor.id}`).once('value');
						if (tutorFb.val() && tutorFb.val().work_schedule) {
							if (tutorFb.val().work_schedule[day] !== 'none') {
								const finalTutor = {
									value: tutor.id,
									label: `${tutor.data().first_name} ${tutor.data().last_name}`
								};
								if (tutors.filter((t) => t.value === finalTutor.value).length < 1) {
									tutors.push(finalTutor);
								}

								if (index === array.length - 1) {
									const sorted = sort(tutors, 'label');
									resolve(sorted);
								}
							}
						}
					});
				});
				resolve(tutors);
			});

			const finals = (await promise) as any;
			dispatch({
				type: TutorActionTypes.FETCH_TUTOR_MULTIPLE_SUCCESS,
				payload: {
					data: {
						selectedType: '',
						tutors: finals,
						selectedTutor: null
					},
					error: ''
				}
			});
		} catch (err) {
			dispatch({
				type: TutorActionTypes.FETCH_TUTOR_MULTIPLE_FAILURE,
				payload: {
					data: {
						selectedType: '',
						tutors: [],
						selectedTutor: null
					},
					error: err.message
				}
			});
		}
	} else {
		dispatch({
			type: TutorActionTypes.FETCH_TUTOR_MULTIPLE_FAILURE,
			payload: {
				data: {
					selectedType: '',
					tutors: [],
					selectedTutor: null
				},
				error: 'Invalid date.'
			}
		});
	}
};

export const fetchTutor = (uid: string) => async (dispatch: (arg: ActionPayload) => void) => {
	try {
		const tutorFb = await fbdb.ref(`tutors/${uid}`).once('value');
		if (tutorFb.val() && tutorFb.val().work_schedule) {
			const processWorkSchedule = tutorFb.val().work_schedule.map((dayOfWeek: any) => {
				if (dayOfWeek !== 'none') {
					return dayOfWeek.map((d: any) => {
						if (d.appointments) {
							const apps = Object.keys(d.appointments).map((appId: string) => {
								return {
									date: d.appointments[appId].date,
									from: d.appointments[appId].from,
									to: d.appointments[appId].to
								};
							});
							return {
								appointments: apps,
								from: d.from,
								to: d.to
							};
						}
						return d;
					});
				}
				return 'none';
			});
			const tutor = await fsdb.collection('tutors').doc(uid).get();
			if (tutor.exists) {
				const finalTutor = {
					uid,
					name: `${tutor.data()!.first_name} ${tutor.data()!.last_name}`,
					work_schedule: processWorkSchedule
				};
				dispatch({
					type: TutorActionTypes.FETCH_TUTOR_SUCESS,
					payload: {
						data: {
							selectedType: '',
							tutors: [],
							selectedTutor: finalTutor
						},
						error: ''
					}
				});
			} else {
				dispatch({
					type: TutorActionTypes.FETCH_TUTOR_SUCESS,
					payload: {
						data: {
							selectedType: '',
							tutors: [],
							selectedTutor: null
						},
						error: 'Could not find data.'
					}
				});
			}
		}
	} catch (err) {
		dispatch({
			type: TutorActionTypes.FETCH_TUTOR_SUCESS,
			payload: {
				data: {
					selectedType: '',
					tutors: [],
					selectedTutor: null
				},
				error: err.message
			}
		});
	}
};

export const tutorStoreClear = () => (dispatch: (arg: ActionPayload) => void) => {
	dispatch({
		type: TutorActionTypes.CLEAR,
		payload: {
			data: {
				selectedType: '',
				tutors: [],
				selectedTutor: null
			},
			error: ''
		}
	});
};
