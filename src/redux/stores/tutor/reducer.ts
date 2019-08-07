import { TutorState, ActionPayload, TutorActionTypes } from './types';

const initialState = {
	data: {
		selectedType: 'single',
		tutors: [],
		selectedTutor: null
	},
	error: ''
};

const TutorReducer = (state: TutorState = initialState, action: ActionPayload): TutorState => {
	switch (action.type) {
		case TutorActionTypes.SELECT_TYPE:
			return {
				...state,
				data: {
					...state.data,
					selectedType: action.payload.data.selectedType
				}
			};

		case TutorActionTypes.FETCH_TUTOR_ONE_SUCCESS:
			return {
				...state,
				data: {
					...state.data,
					tutors: action.payload.data.tutors
				}
			};
		case TutorActionTypes.FETCH_TUTOR_ONE_FAILURE:
			return {
				...state,
				error: action.payload.error
			};
		case TutorActionTypes.FETCH_TUTOR_MULTIPLE_SUCCESS:
			return {
				...state,
				data: {
					...state.data,
					tutors: action.payload.data.tutors
				}
			};
		case TutorActionTypes.FETCH_TUTOR_MULTIPLE_FAILURE:
			return {
				...state,
				error: action.payload.error
			};
		case TutorActionTypes.FETCH_TUTOR_SUCESS:
			return {
				...state,
				data: {
					...state.data,
					selectedTutor: action.payload.data.selectedTutor
				}
			};
		case TutorActionTypes.FETCH_TUTOR_FAILURE:
			return {
				...state,
				error: action.payload.error
			};
		case TutorActionTypes.CLEAR:
			return { ...initialState };
		default:
			return { ...state };
	}
};

export default TutorReducer;
