import { fsdb } from 'index';
import { SettingsActionTypes, ActionPayload } from './types';

export const fetchAppointmentSettings = () => async (dispatch: (arg: ActionPayload) => void) => {
	try {
    const settingSnapshot = await fsdb.collection('settings').doc('appointment').get();
    const appointmentSettings = settingSnapshot.data();
    dispatch({
			type: SettingsActionTypes.FETCH_SETTINGS_SUCCESS,
			payload: appointmentSettings
		});
	} catch (err) {
		dispatch({
			type: SettingsActionTypes.FETCH_SETTINGS_FAILURE,
			payload: err.message
		});
	}
};
