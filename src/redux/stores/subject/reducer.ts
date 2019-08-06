import { SubjectState, ActionPayload, SubjectActionTypes } from './types';

const initialState = {
	data: {
		subjects: [],
		subject: null
	},
	error: ''
};

const SubjectReducer = (state: SubjectState = initialState, action: ActionPayload): SubjectState => {
	switch (action.type) {
		case SubjectActionTypes.FETCH_ALL_SUCCESS:
			return {
				...state,
				data: {
					...state.data,
					subjects: action.payload.data.subjects
				}
			};
		case SubjectActionTypes.FETCH_ALL_FAILURE:
			return {
				...state,
				error: action.payload.error
			};
		case SubjectActionTypes.SELECT_SUBJECT:
			return {
				...state,
				data: {
					...state.data,
					subject: action.payload.data.subject
				}
			};
		case SubjectActionTypes.CLEAR:
			return { ...initialState };
		default:
			return { ...state };
	}
};

export default SubjectReducer;
