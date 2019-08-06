import React from 'react';
import ReactDOM from 'react-dom';
import * as firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/functions';
import { APIKEY, AUTHDOMAIN, DATABASEURL, PROJECTID, STORAGEBUCKET, MESSAGINGSENDERID, APPID } from './config';
import App from './App';
import "react-datepicker/dist/react-datepicker.css";
import * as serviceWorker from './serviceWorker';

const firebaseConfig = {
	apiKey: APIKEY,
	authDomain: AUTHDOMAIN,
	databaseURL: DATABASEURL,
	projectId: PROJECTID,
	storageBucket: STORAGEBUCKET,
	messagingSenderId: MESSAGINGSENDERID,
	appId: APPID
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const fbdb = firebase.database();
export const fsdb = firebase.firestore();
export const functions = firebase.functions();


ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
