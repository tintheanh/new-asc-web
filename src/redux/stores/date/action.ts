import { ActionPayload, DateActionTypes } from './types';

export const selectDateOne = (date: Date) => (dispatch: (arg: ActionPayload) => void) => {
	dispatch({
		type: DateActionTypes.SELECT_DATE_ONE,
		payload: {
			data: {
				dayOne: date,
				dayTwo: null
			},
			error: ''
		}
	});
};

export const selectDateTwo = (date: Date) => (dispatch: (arg: ActionPayload) => void) => {
	dispatch({
		type: DateActionTypes.SELECT_DATE_TWO,
		payload: {
			data: {
				dayOne: null,
				dayTwo: date
			},
			error: ''
		}
	});
};

export const dateStoreClear = () => (dispatch: (arg: ActionPayload) => void) => {
	dispatch({
		type: DateActionTypes.CLEAR,
		payload: {
			data: {
				dayOne: null,
				dayTwo: null
			},
			error: ''
		}
	});
}
