export enum SubjectActionTypes {
	FETCH_ALL_SUCCESS = '@@subject/FETCH_ALL_SUCCESS',
	FETCH_ALL_FAILURE = '@@subject/FETCH_ALL_FAILURE',

	SELECT_SUBJECT = '@@subject/SELECT_SUBJECT',
	CLEAR = '@@subject/CLEAR'
}

export interface Subject {
	value: string;
	label: string;
}

export interface SubjectState {
	data: {
		subjects: Subject[];
		subject: Subject | null;
	};
	error: string;
}

export interface ActionPayload {
	type: string;
	payload: SubjectState;
}
