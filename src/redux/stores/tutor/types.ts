export enum TutorActionTypes {
	SELECT_TYPE = '@@tutor/SELECT_TYPE',
	SELECT_DATE = '@@tutor/SELECT_DATE',

	FETCH_TUTOR_SUCCESS = '@@tutor/FETCH_TUTOR_SUCCESS',
	FETCH_TUTOR_FAILURE = '@@tutorFETCH_TUTOR_FAILURE',

	CLEAR = '@@tutor/CLEAR'
}

export interface TutorState {
	data: {
		selectedType: string;
		tutors: any[];
		selectedDate: Date | null;
	};
	error: string;
}

export interface ActionPayload {
	type: string;
	payload: TutorState;
}
