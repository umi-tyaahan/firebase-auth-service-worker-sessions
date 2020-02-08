import firebase from 'firebase/app';
import 'firebase/auth';
import * as config from './config.js';

// Initialize Firebase app.
firebase.initializeApp(config);

firebase.auth().onAuthStateChanged((user) => {
  if (!user) {
    console.log('redirect to /');
    window.location.assign('/');
    return;
  }
  firebase.auth().signOut();
});