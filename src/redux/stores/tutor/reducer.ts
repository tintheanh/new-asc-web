import { TutorState, ActionPayload, TutorActionTypes } from './types';

const initialState = {
	data: {
		selectedType: 'single',
		datesWithTutors: [],
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

		case TutorActionTypes.FETCH_TUTOR_SUCCESS:
			return {
				...state,
				data: {
					...state.data,
					datesWithTutors: action.payload.data.datesWithTutors
				}
			};
		case TutorActionTypes.FETCH_TUTOR_FAILURE:
			return {
				...state,
				error: action.payload.error
			};
		case TutorActionTypes.SELECT_TUTOR:
			return {
				...state,
				data: {
					...state.data,
					selectedTutor: action.payload.data.selectedTutor
				}
			};
		case TutorActionTypes.CLEAR_TUTOR:
			return {
				...state,
				data: {
					...state.data,
					selectedTutor: action.payload.data.selectedTutor
				}
			};
		case TutorActionTypes.CLEAR:
			return { ...initialState };
		default:
			return { ...state };
	}
};

export default TutorReducer;
