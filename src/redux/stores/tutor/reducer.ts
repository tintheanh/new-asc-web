import { TutorState, ActionPayload, TutorActionTypes } from './types';

const initialState = {
	data: {
		selectedType: 'single',
		selectedDate: new Date(),
		tutors: []
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
		case TutorActionTypes.SELECT_DATE:
			return {
				...state,
				data: {
					...state.data,
					selectedDate: action.payload.data.selectedDate
				}
			};
		case TutorActionTypes.FETCH_TUTOR_SUCCESS:
			return {
				...state,
				data: {
					...state.data,
					tutors: action.payload.data.tutors
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
