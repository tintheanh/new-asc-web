export enum AppointmentActionTypes {
	MAKE_SUCCESS = '@@appointment/MAKE_SUCCESS',
	MAKE_FAILURE = '@@appointment/MAKE_FAILURE',

	CLEAR = '@@appointment/CLEAR'
}

export interface AppointmentState {
	data: any;
	error: string;
}

export interface ActionPayload {
	type: string;
	payload: AppointmentState;
}
