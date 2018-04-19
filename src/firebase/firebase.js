import * as firebase from 'firebase';

const config = {
    apiKey: "AIzaSyBFlxJM-hTsyIksT1b9sdQVAYzenHoomeU",
    authDomain: "react-firebase-authentic-269e4.firebaseapp.com",
    databaseURL: "https://react-firebase-authentic-269e4.firebaseio.com",
    projectId: "react-firebase-authentic-269e4",
    storageBucket: "react-firebase-authentic-269e4.appspot.com",
    messagingSenderId: "334559511061"
};


if (!firebase.apps.length) {
   firebase.initializeApp(config);
}

const auth = firebase.auth();
const db = firebase.database();
const st = firebase.storage();

export {
    auth,
    db,
    st
};