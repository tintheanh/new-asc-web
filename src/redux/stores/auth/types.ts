export enum AuthActionTypes {
	LOGIN_SUCCESS = '@@auth/LOGIN_SUCCESS',
	LOGIN_FAILURE = '@@auth/LOGIN_FAILURE',
	LOGOUT_SUCCESS = '@@auth/LOGOUT_SUCCESS',
	LOGOUT_FAILURE = '@@auth/LOGOUT_FAILURE',

	FETCH_APPOINTMENT_SUCCESS = '@@auth/FETCH_APPOINTMENT_SUCCESS',
	FETCH_APPOINTMENT_FAILURE = '@@auth/FETCH_APPOINTMENT_FAILURE',

	MAKE_APPOINTMENT_SUCCESS = '@@auth/MAKE_APPOINTMENT_SUCCESS',
	MAKE_APPOINTMENT_FAILURE = '@@auth/MAKE_APPOINTMENT_FAILURE',

	SELECT_APPOINTMENT = '@@auth/SELECT_APPOINTMENT',
	INPUT_REASON = '@@auth/INPUT_REASON',

	DELETE_APPOINTMENT_SUCCESS = '@@auth/DELETE_APPOINTMENT_SUCCESS',
	DELETE_APPOINTMENT_FAILURE = '@@auth.DELETE_APPOINTMENT_FAILURE',

	CLEAR_STORE = '@@AUTH/CLEAR_STORE',
	CLEAR_ERROR = '@@auth/CLEAR_ERROR'
}

export interface AuthState {
	data: {
		profile: any;
		appointments: any[];
		selectedAppointment: any,
		reasonToDeleteAppt: string;
	};
	error: string;
}

export interface ActionPayload {
	type: string;
	payload: AuthState;
}
