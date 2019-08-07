import { DateActionTypes, DateState, ActionPayload } from './types';

const initialState = {
	data: {
		dayOne: new Date(),
		dayTwo: null
		// dayTwo: new Date(Date.now() + 6.048e8)
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
					dayOne: action.payload.data.dayOne
				}
			};
		case DateActionTypes.SELECT_DATE_TWO:
			return {
				...state,
				data: {
					...state.data,
					dayTwo: action.payload.data.dayTwo
				}
			};
		case DateActionTypes.CLEAR:
			return { ...initialState };
		default:
			return { ...state };
	}
};

export default DateReducer;
