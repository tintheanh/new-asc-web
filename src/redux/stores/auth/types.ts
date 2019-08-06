export enum AuthActionTypes {
	LOGIN_SUCCESS = '@@auth/LOGIN_SUCCESS',
	LOGIN_FAILURE = '@@auth/LOGIN_FAILURE',
	LOGOUT_SUCCESS = '@@auth/LOGOUT_SUCCESS',
	LOGOUT_FAILURE = '@@auth/LOGOUT_FAILURE',

	CLEAR_ERROR = '@@auth/CLEAR_ERROR'
}

export interface AuthState {
	data: {
		profile: any;
	};
	error: string;
}

export interface ActionPayload {
	type: string;
	payload: AuthState;
}
