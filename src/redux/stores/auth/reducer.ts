import { AuthState, ActionPayload, AuthActionTypes } from './types';

const initialState = {
	data: {
		profile: null
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
		case AuthActionTypes.LOGOUT_SUCCESS:
			return {
				...state,
				data: {
					...state.data,
					profile: action.payload.data.profile
				}
			};
		case AuthActionTypes.LOGOUT_FAILURE:
			return {
				...state,
				error: action.payload.error
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
