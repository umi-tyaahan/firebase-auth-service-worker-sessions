import firebase from 'firebase/app';
import 'firebase/auth';
import * as firebaseui from 'firebaseui';
import * as config from './config.js';

/**
 * @return {!Object} The FirebaseUI config.
 */
function getUiConfig() {
  // This configuration supports email/password and Google providers.
  return {
    'callbacks': {
      // Called when the user has been successfully signed in.
      'signInSuccessWithAuthResult': (userCredential, redirectUrl) => {
        //console.log('redirect to /profile');
        // Redirect to profile on success.
        window.location.assign('/');
        // Do not automatically redirect.
        return false;
      },
      'uiShown': () => {
        // Remove progress bar when the UI is ready.
        document.getElementById('loading').classList.add('hidden');
      }
    },
    //'signInFlow': 'popup',
    'signInFlow': 'redirect',
    'signInOptions': [
      {
        provider: firebase.auth.GoogleAuthProvider.PROVIDER_ID
      }
    ],
    // Terms of service url.
    'tosUrl': 'https://www.google.com',
    'privacyPolicyUrl': 'https://www.google.com',
    'credentialHelper': firebaseui.auth.CredentialHelper.NONE
  };
}

/**
 * Initializes the app.
 */
const initApp = () => {
  // Renders sign-in page using FirebaseUI.
  ui.start('#firebaseui-container', getUiConfig());
};
// Initialize Firebase app.
var app = firebase.initializeApp(config);
// Set persistence to local.
firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);
// Initialize the FirebaseUI Widget using Firebase.
const ui = new firebaseui.auth.AuthUI(app.auth());
// On page ready, initialize app.
window.addEventListener('load', initApp);