import { AppointmentActionTypes, AppointmentState, ActionPayload } from './types';

const initialState = {
	data: null,
	error: ''
};

const AppointmentReducer = (state: AppointmentState = initialState, action: ActionPayload): AppointmentState => {
	switch (action.type) {
		case AppointmentActionTypes.MAKE_SUCCESS:
			return {
				...state
			};
		case AppointmentActionTypes.MAKE_FAILURE:
			return {
				...state,
				error: action.payload.error
			};
		case AppointmentActionTypes.CLEAR:
			return { ...initialState };
		default:
			return { ...state };
	}
};

export default AppointmentReducer;
