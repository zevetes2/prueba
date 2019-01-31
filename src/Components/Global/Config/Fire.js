import firebase from 'firebase';

const config = {
    apiKey: "AIzaSyCWGfIB3qU8tlEMT5w3CgAZF1QBFUYSa34",
    authDomain: "finalweb-34110.firebaseapp.com",
    databaseURL: "https://finalweb-34110.firebaseio.com",
    projectId: "finalweb-34110",
    storageBucket: "finalweb-34110.appspot.com",
    messagingSenderId: "1059487527504"
  };
  const fire = firebase.initializeApp(config);
  export default fire;