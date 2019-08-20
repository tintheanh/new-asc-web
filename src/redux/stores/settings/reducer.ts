import { SettingState, ActionPayload, SettingsActionTypes } from './types';

const initialState = {
	data: {
		appointmentSettings: null
	},
	error: ''
};

const SettingReducer = (state: SettingState = initialState, action: ActionPayload): SettingState => {
	switch (action.type) {
		case SettingsActionTypes.FETCH_SETTINGS_SUCCESS:
			return {
				...state,
				data: {
					...state.data,
					appointmentSettings: action.payload
				}
			};
		case SettingsActionTypes.FETCH_SETTINGS_FAILURE:
			return {
				...state,
				error: action.payload
			};
		default:
			return { ...state };
	}
};

export default SettingReducer;
