import { ActionPayload, DateActionTypes } from './types';

export const selectDateOne = (dates: Date[], date: Date, noTo: boolean) => (dispatch: (arg: ActionPayload) => void) => {
	const newDates = [ ...dates ];
	const reset = Math.floor(date.setHours(0, 0, 0) / 1000) * 1000;
	let finalDates;
	if (noTo && newDates.length === 1) {
		finalDates = [ new Date(reset) ];
	} else {
		if (reset < newDates[0].getTime()) {
			console.log(reset);
			for (let i = newDates[0].getTime(); i >= reset; i -= 8.64e7) {
				if (i === newDates[0].getTime()) continue;
				else newDates.unshift(new Date(i));
			}
			finalDates = [ ...newDates ];
		} else {
			const shorterDates = newDates.filter((date) => date.getTime() >= reset);
			finalDates = [ ...shorterDates ];
		}
	}
	// console.log(finalDates);
	dispatch({
		type: DateActionTypes.SELECT_DATE_ONE,
		payload: {
			data: {
				dates: finalDates
			},
			error: ''
		}
	});
};

export const selectDateTwo = (dates: Date[], date: Date) => (dispatch: (arg: ActionPayload) => void) => {
	const newDates = [ ...dates ];
	const reset = Math.floor(date.setHours(0, 0, 0) / 1000) * 1000;
	let finalDates;
	if (reset > newDates[newDates.length - 1].getTime()) {
		for (let i = newDates[newDates.length - 1].getTime(); i <= reset; i += 8.64e7) {
			if (i === newDates[newDates.length - 1].getTime()) continue;
			else newDates.push(new Date(i));
		}
		finalDates = [ ...newDates ];
	} else {
		const shorterDates = dates.filter((date) => date.getTime() <= reset);
		finalDates = [ ...shorterDates ];
	}

	// console.log(finalDates);
	dispatch({
		type: DateActionTypes.SELECT_DATE_TWO,
		payload: {
			data: {
				dates: finalDates
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
				dates: [ new Date(Math.floor(new Date().setHours(0, 0, 0) / 1000) * 1000) ]
			},
			error: ''
		}
	});
};
