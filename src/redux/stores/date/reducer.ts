import { DateActionTypes, DateState, ActionPayload } from './types';

const initialState = {
	data: {
		dayOne: new Date(),
		dayTwo: null,
		dates: [ new Date(Math.floor(new Date().setHours(0, 0, 0) / 1000) * 1000) ]
	},
	error: ''
};

const DateReducer = (state: DateState = initialState, action: ActionPayload): DateState => {
	switch (action.type) {
		case DateActionTypes.SELECT_DATE_ONE:
			return {
				...state,
				data: {
					...state.data,
					dates: action.payload.data.dates
				}
			};
		case DateActionTypes.SELECT_DATE_TWO:
			return {
				...state,
				data: {
					...state.data,
					dates: action.payload.data.dates
				}
			};
		case DateActionTypes.CLEAR:
			return {
				...state,
				data: {
					...state.data,
					dates: action.payload.data.dates
				}
			};
		default:
			return { ...state };
	}
};

export default DateReducer;
