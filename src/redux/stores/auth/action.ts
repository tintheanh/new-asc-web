import { auth, fsdb } from 'index';
import { AuthActionTypes, ActionPayload } from './types';

export const login = (uid: string) => (dispatch: (arg: ActionPayload) => void) => {
	return new Promise((resolve, reject) => {
		if (uid.length) {
			auth
				.signInWithEmailAndPassword(`${uid}@asc.com`, 'asc1234')
				.then(async () => {
					const user = auth.currentUser;
					if (user) {
						try {
							const doc = await fsdb.collection('students').doc(user.uid).get();
							const data = doc.data();
							if (doc.exists && data) {
								const profile = {
									uid: doc.id,
									email: data.email,
									first_name: data.first_name,
									last_name: data.last_name,
									studentId: data.studentId
								};
								dispatch({
									type: AuthActionTypes.LOGIN_SUCCESS,
									payload: {
										data: {
											profile: profile
										},
										error: ''
									}
								});
								resolve();
							} else {
								dispatch({
									type: AuthActionTypes.LOGIN_FAILURE,
									payload: {
										data: {
											profile: null
										},
										error: 'Could not find data.'
									}
								});
								reject(new Error('Could not find data.'));
							}
						} catch (err) {
							dispatch({
								type: AuthActionTypes.LOGIN_FAILURE,
								payload: {
									data: {
										profile: null
									},
									error: err.message
								}
							});
							reject(err);
						}
					} else {
						dispatch({
							type: AuthActionTypes.LOGIN_FAILURE,
							payload: {
								data: {
									profile: null
								},
								error: 'Could not login.'
							}
						});
						reject(new Error('Could not login.'));
					}
				})
				.catch((err) => {
					dispatch({
						type: AuthActionTypes.LOGIN_FAILURE,
						payload: {
							data: {
								profile: null
							},
							error: err.message
						}
					});
					reject(err);
				});
		} else {
			dispatch({
				type: AuthActionTypes.LOGIN_FAILURE,
				payload: {
					data: {
						profile: null
					},
					error: 'ID cannot be blank.'
				}
			});
			reject(new Error('ID cannot be blank.'));
		}
	});
};

export const logout = () => (dispatch: (arg: ActionPayload) => void) => {
	auth
		.signOut()
		.then(() =>
			dispatch({
				type: AuthActionTypes.LOGOUT_SUCCESS,
				payload: {
					data: {
						profile: null
					},
					error: ''
				}
			})
		)
		.catch((err) =>
			dispatch({
				type: AuthActionTypes.LOGIN_FAILURE,
				payload: {
					data: {
						profile: null
					},
					error: err.message
				}
			})
		);
};

export const clearError = () => (dispatch: (arg: ActionPayload) => void) => {
	dispatch({
		type: AuthActionTypes.CLEAR_ERROR,
		payload: {
			data: {
				profile: null
			},
			error: ''
		}
	});
};
