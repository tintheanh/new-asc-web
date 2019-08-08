import { DateActionTypes, DateState, ActionPayload } from './types';

const initialState = {
	data: {
		dayOne: new Date(),
		dayTwo: null,
		dates: [ new Date(new Date().setHours(0, 0, 0)) ]
		// dates: [
		// 	new Date(new Date().setHours(0, 0, 0)),
		// 	new Date(Date.now() + 8.64e7),
		// 	new Date(Date.now() + 1.728e8),
		// 	new Date(Date.now() + 2.592e8),
		// 	new Date(Date.now() + 3.456e8),
		// 	new Date(Date.now() + 4.32e8),
		// 	new Date(Date.now() + 5.184e8)
		// ]
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
					dayOne: action.payload.data.dayOne,
					dates: action.payload.data.dates
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
