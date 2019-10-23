import * as firebase from 'firebase';

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyD58otLcUfT3WaeV8l73fMPeGyheHeJaF0",
  authDomain: "bgsocial-88691.firebaseapp.com",
  databaseURL: "https://bgsocial-88691.firebaseio.com/",
  storageBucket: "bgsocial-88691.appspot.coml"
};

export default !firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();
