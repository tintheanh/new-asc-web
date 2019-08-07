export enum DateActionTypes {
	SELECT_DATE_ONE = '@@date/SELECT_DATE_ONE',
	SELECT_DATE_TWO = '@@date/SELECT_DATE_TWO',

	CLEAR = '@@date/CLEAR'
}

export interface DateState {
	data: {
		dayOne: Date | null;
		dayTwo: Date | null;
	};
	error: string;
}

export interface ActionPayload {
	type: string;
	payload: DateState;
}
