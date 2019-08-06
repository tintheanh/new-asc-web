import { fbdb, fsdb } from 'index';
import { TutorActionTypes, ActionPayload } from './types';

export const selectType = (type: string) => (dispatch: (arg: ActionPayload) => void) => {
	dispatch({
		type: TutorActionTypes.SELECT_TYPE,
		payload: {
			data: {
				selectedType: type,
				tutors: [],
				selectedDate: null
			},
			error: ''
		}
	});
};

export const selectDate = (date: Date) => (dispatch: (arg: ActionPayload) => void) => {
	dispatch({
		type: TutorActionTypes.SELECT_DATE,
		payload: {
			data: {
				selectedType: '',
				tutors: [],
				selectedDate: date
			},
			error: ''
		}
	});
};

export const fetchTutors = (subjectId: string, day: number) => async (dispatch: (arg: ActionPayload) => void) => {
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
			type: TutorActionTypes.FETCH_TUTOR_SUCCESS,
			payload: {
				data: {
					selectedType: '',
					tutors: finals,
					selectedDate: null
				},
				error: ''
			}
		});
	} catch (err) {
		dispatch({
			type: TutorActionTypes.FETCH_TUTOR_FAILURE,
			payload: {
				data: {
					selectedType: '',
					tutors: [],
					selectedDate: null
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
				selectedDate: null
			},
			error: ''
		}
	});
};
