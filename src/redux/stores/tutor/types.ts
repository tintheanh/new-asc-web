export enum TutorActionTypes {
	SELECT_TYPE = '@@tutor/SELECT_TYPE',
	SELECT_TUTOR = '@@tutor/SELECT_TUTOR',

	FETCH_TUTOR_SUCCESS = '@@tutor/FETCH_TUTOR_SUCESS',
	FETCH_TUTOR_FAILURE = '@@tutor/FETCH_TUTOR_FAILURE',

	CLEAR_TUTOR = '@@tutor/CLEAR_TUTOR',

	CLEAR = '@@tutor/CLEAR'
}

export interface TutorState {
	data: {
		selectedType: string;
		datesWithTutors: any[];
		selectedTutor: any;
	};
	error: string;
}

export interface ActionPayload {
	type: string;
	payload: TutorState;
}
