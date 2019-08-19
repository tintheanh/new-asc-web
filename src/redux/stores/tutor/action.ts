import { fbdb, fsdb } from 'index';
import { TutorActionTypes, ActionPayload } from './types';
import { timeStringToFloat } from 'utils/functions';

export const selectType = (type: string) => (dispatch: (arg: ActionPayload) => void) => {
	dispatch({
		type: TutorActionTypes.SELECT_TYPE,
		payload: {
			data: {
				selectedType: type,
				datesWithTutors: [],
				selectedTutor: null
			},
			error: ''
		}
	});
};

const isOverlapOffTimes = (off_times: any[], date: Date) => {
	const unix = Math.floor(date.getTime() / 1000);
	for (const time of off_times) {
		if (unix >= time.from && unix <= time.to) {
			return true;
		}
	}
	return false;
};

export const fetchTutors = (subjectId: string, dates: Date[]) => async (dispatch: (arg: ActionPayload) => void) => {
	try {
		const tutorsWithSubject = await fsdb
			.collection('tutors')
			.where('subjects', 'array-contains', subjectId)
			.where('active', '==', true)
			.get();
		// console.log(dates);
		const tutorsInDate = await Promise.all(
			dates.map(async (date) => {
				const tutorIds = await Promise.all(
					tutorsWithSubject.docs.map(async (tutor) => {
						const tutorRef = await fbdb.ref(`tutors/${tutor.id}`).once('value');
						const tutorData = tutorRef.val();
						let off_times: any[] = [];
						if (tutorData.off_time) {
							off_times = Object.keys(tutorData.off_time).map(
								(key: string) => tutorData.off_time[key]
							);
							// console.log(off_times);
						} else {
							off_times = [];
						}
						if (tutorData.work_schedule[date.getDay()] !== 'none' && !isOverlapOffTimes(off_times, date)) {
							// console.log(
							// 	timeStringToFloat(
							// 		tutorRef.val().work_schedule[date.getDay()][
							// 			tutorRef.val().work_schedule[date.getDay()].length - 1
							// 		].to.time
							// 	)
							// );
							// if (
							// 	dates[0].getDay() === new Date().getDay() &&
							// 	timeStringToFloat(new Date().toLocaleTimeString('en-US')) >
							// 		timeStringToFloat(
							// 			tutorRef.val().work_schedule[date.getDay()][
							// 				tutorRef.val().work_schedule[date.getDay()].length - 1
							// 			].to.time
							// 		) -
							// 			0.5
							// ) {
							// 	console.log('yes', timeStringToFloat(new Date().toLocaleTimeString('en-US')));
							// 	return null;
							// }

							// if (
							// 	dates[0].getDay() === new Date().getDay() &&
							// 	timeStringToFloat(new Date().toLocaleTimeString('en-US')) >
							// 		timeStringToFloat(workDay[workDay.length - 1].to.time)
							// ) {

							// }
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
								email: tutor.data().email,
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
			type: TutorActionTypes.FETCH_TUTOR_SUCCESS,
			payload: {
				data: {
					selectedType: '',
					datesWithTutors: tutorsInDate,
					selectedTutor: null
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
					datesWithTutors: [],
					selectedTutor: null
				},
				error: err.message
			}
		});
	}
};

export const selectTutor = (tutor: any) => (dispatch: (arg: ActionPayload) => void) => {
	dispatch({
		type: TutorActionTypes.SELECT_TUTOR,
		payload: {
			data: {
				selectedType: '',
				datesWithTutors: [],
				selectedTutor: tutor
			},
			error: ''
		}
	});
};

// export const tutorClear = () => (dispatch: (arg: ActionPayload) => void) => {
// 	dispatch({
// 		type: TutorActionTypes.CLEAR_TUTOR,
// 		payload: {
// 			data: {
// 				selectedType: '',
// 				datesWithTutors: [],
// 				selectedTutor: null
// 			},
// 			error: ''
// 		}
// 	});
// };

export const tutorStoreClear = () => (dispatch: (arg: ActionPayload) => void) => {
	dispatch({
		type: TutorActionTypes.CLEAR,
		payload: {
			data: {
				selectedType: '',
				datesWithTutors: [],
				selectedTutor: null
			},
			error: ''
		}
	});
};
