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

export const fetchTutors = (subjectId: string, dates: Date[]) => async (dispatch: (arg: ActionPayload) => void) => {
	try {
		const tutorsWithSubject = await fsdb.collection('tutors').where('subjects', 'array-contains', subjectId).get();
		const tutorsInDate = await Promise.all(
			dates.map(async (date) => {
				const tutorIds = await Promise.all(
					tutorsWithSubject.docs.map(async (tutor) => {
						const tutorRef = await fbdb.ref(`tutors/${tutor.id}`).once('value');
						if (tutorRef.val().work_schedule[date.getDay()] !== 'none') {
							const processWorkSchedule = tutorRef.val().work_schedule.map((workDay: any) => {
								if (workDay !== 'none') {
									return workDay.map((shift: any) => {
										if (shift.appointments) {
											const appts = Object.keys(shift.appointments).map((apptId: string) => ({
												date: shift.appointments[apptId].date,
												from: shift.appointments[apptId].from,
												to: shift.appointments[apptId].to
											}));
											return {
												appointments: appts,
												from: shift.from,
												to: shift.to
											};
										}
										return shift;
									});
								}
								return null;
							});
							const finalTutor = {
								uid: tutor.id,
								name: `${tutor.data().first_name} ${tutor.data().last_name}`,
								work_schedule: processWorkSchedule
							};
							return finalTutor;
						}
						return null;
					})
				);
				const filered = tutorIds.filter((tutor) => tutor !== null);
				const finals = Array.from(new Set(filered));
				return {
					date: date,
					tutors: finals
				};
			})
		);
		dispatch({
			type: TutorActionTypes.FETCH_TUTOR_ONE_SUCCESS,
			payload: {
				data: {
					selectedType: '',
					tutors: tutorsInDate,
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

export const tutorClear = () => (dispatch: (arg: ActionPayload) => void) => {
	dispatch({
		type: TutorActionTypes.CLEAR_TUTOR,
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
