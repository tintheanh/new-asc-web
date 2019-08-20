import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import AuthReducer from './auth/reducer';
import SubjectReducer from './subject/reducer';
import TutorReducer from './tutor/reducer';
import DateReducer from './date/reducer';
import SettingReducer from './settings/reducer';

const authPersistConfig = {
	key: 'auth',
	storage,
	blacklist: [ 'error' ]
};

const subjectPersisConfig = {
	key: 'subject',
	storage
};

const rootReducer = combineReducers({
	auth: persistReducer(authPersistConfig, AuthReducer),
	subject: persistReducer(subjectPersisConfig, SubjectReducer),
	tutor: TutorReducer,
	settings: SettingReducer,
	date: DateReducer
});

export default rootReducer;
