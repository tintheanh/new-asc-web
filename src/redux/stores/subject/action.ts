import { fsdb } from 'index';
import { SubjectActionTypes, ActionPayload, Subject } from './types';

export const fetchAllSubjects = () => async (dispatch: (arg: ActionPayload) => void) => {
	try {
		const snapshot = await fsdb.collection('subjects').orderBy('label').get();
		const subjects: Subject[] = snapshot.docs.map((doc) => {
			const subject = {
				value: doc.id,
				label: `${doc.data().label} - ${doc.data().full}`
			};
			return subject;
		});
		dispatch({
			type: SubjectActionTypes.FETCH_ALL_SUCCESS,
			payload: {
				data: {
					subjects,
					subject: null
				},
				error: ''
			}
		});
	} catch (err) {
		dispatch({
			type: SubjectActionTypes.FETCH_ALL_FAILURE,
			payload: {
				data: {
					subjects: [],
					subject: null
				},
				error: err.message
			}
		});
	}
};

export const selectSubject = (subject: Subject) => (dispatch: (arg: ActionPayload) => void) => {
	dispatch({
		type: SubjectActionTypes.SELECT_SUBJECT,
		payload: {
			data: {
				subjects: [],
				subject
			},
			error: ''
		}
	});
};

export const subjectStoreClear = () => (dispatch: (arg: ActionPayload) => void) => {
	dispatch({
		type: SubjectActionTypes.CLEAR,
		payload: {
			data: {
				subjects: [],
				subject: null
			},
			error: ''
		}
	});
};
