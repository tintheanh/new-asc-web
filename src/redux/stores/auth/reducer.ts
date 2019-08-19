import { AuthState, ActionPayload, AuthActionTypes } from './types';

const initialState = {
	data: {
		profile: null,
		appointments: [],
		selectedAppointment: null,
		reasonToDeleteAppt: ''
	},
	error: ''
};

const AuthReducer = (state: AuthState = initialState, action: ActionPayload): AuthState => {
	switch (action.type) {
		case AuthActionTypes.LOGIN_SUCCESS:
			return {
				...state,
				data: {
					...state.data,
					profile: action.payload.data.profile
				}
			};
		case AuthActionTypes.LOGIN_FAILURE:
			return {
				...state,
				error: action.payload.error
			};
		case AuthActionTypes.FETCH_APPOINTMENT_SUCCESS:
			return {
				...state,
				data: {
					...state.data,
					appointments: action.payload.data.appointments
				}
			};
		case AuthActionTypes.FETCH_APPOINTMENT_FAILURE:
			return {
				...state,
				data: {
					...state.data,
					appointments: action.payload.data.appointments
				}
			};
		case AuthActionTypes.MAKE_APPOINTMENT_SUCCESS:
			return {
				...state,
				data: {
					...state.data
				}
			};
		case AuthActionTypes.MAKE_APPOINTMENT_FAILURE:
			return {
				...state,
				error: action.payload.error
			};
		case AuthActionTypes.LOGOUT_SUCCESS:
			return {
				...state,
				data: {
					...state.data,
					profile: action.payload.data.profile,
					selectedAppointment: action.payload.data.selectedAppointment,
					reasonToDeleteAppt: action.payload.data.reasonToDeleteAppt
				}
			};
		case AuthActionTypes.LOGOUT_FAILURE:
			return {
				...state,
				error: action.payload.error
			};
		case AuthActionTypes.SELECT_APPOINTMENT:
			return {
				...state,
				data: {
					...state.data,
					selectedAppointment: action.payload.data.selectedAppointment
				}
			};
		case AuthActionTypes.INPUT_REASON:
			return {
				...state,
				data: {
					...state.data,
					reasonToDeleteAppt: action.payload.data.reasonToDeleteAppt
				}
			};
		case AuthActionTypes.DELETE_APPOINTMENT_SUCCESS:
			return {
				...state,
				data: {
					...state.data,
					appointments: action.payload.data.appointments
				}
			};
		case AuthActionTypes.DELETE_APPOINTMENT_FAILURE:
			return {
				...state,
				error: action.payload.error
			};
		case AuthActionTypes.CLEAR_STORE:
			return {
				...state,
				data: {
					...state.data,
					selectedAppointment: action.payload.data.selectedAppointment,
					reasonToDeleteAppt: action.payload.data.reasonToDeleteAppt
				}
			};
		case AuthActionTypes.CLEAR_ERROR:
			return {
				...state,
				error: action.payload.error
			};
		default:
			return { ...state };
	}
};

export default AuthReducer;
