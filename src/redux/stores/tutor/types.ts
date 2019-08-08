export enum TutorActionTypes {
	SELECT_TYPE = '@@tutor/SELECT_TYPE',

	FETCH_TUTOR_ONE_SUCCESS = '@@tutor/FETCH_TUTOR_ONE_SUCCESS',
	FETCH_TUTOR_ONE_FAILURE = '@@tutorFETCH_TUTOR_FAILURE',

	FETCH_TUTOR_MULTIPLE_SUCCESS = '@@tutor/FETCH_TUTOR_MULTIPLE_SUCCESS',
	FETCH_TUTOR_MULTIPLE_FAILURE = '@@tutor/FETCH_TUTOR_MULTIPLE_FAILURE',

	FETCH_TUTOR_SUCESS = '@@tutor/FETCH_TUTOR_SUCESS',
	FETCH_TUTOR_FAILURE = '@@tutor/FETCH_TUTOR_FAILURE',

	CLEAR_TUTOR = '@@tutor/CLEAR_TUTOR',

	CLEAR = '@@tutor/CLEAR'
}

export interface TutorState {
	data: {
		selectedType: string;
		tutors: any[];
		selectedTutor: any;
	};
	error: string;
}

export interface ActionPayload {
	type: string;
	payload: TutorState;
}
