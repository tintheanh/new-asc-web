export enum SettingsActionTypes {
	FETCH_SETTINGS_SUCCESS = '@@settings/FETCH_SETTINGS_SUCCESS',
	FETCH_SETTINGS_FAILURE = '@@settings/FETCH_SETTINGS_FAILURE'
}

export interface SettingState {
	data: {
		appointmentSettings: any;
	};
	error: string;
}

export interface ActionPayload {
	type: string;
	payload: any;
}
