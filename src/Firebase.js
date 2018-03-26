import * as firebase from 'firebase'
var config = { /* COPY THE ACTUAL CONFIG FROM FIREBASE CONSOLE */
  apiKey: "AIzaSyDCiqZu5vc0f5EwSYiZ_ppQ3XGemiTUtqg",
  authDomain: "code-witch.firebaseapp.com",
  databaseURL: "https://code-witch.firebaseio.com/",
  projectId: "code-witch",
  storageBucket: "code-witch.appspot.com",
  messagingSenderId: "247592985938"
};
export const firebaseApp = firebase.initializeApp(config);
