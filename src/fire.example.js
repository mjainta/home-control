import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
// Initialize Firebase
var config = {
    apiKey: "your api key",
    authDomain: "your auth domain",
    databaseURL: "your database url",
    projectId: "your project id",
    storageBucket: "your storage bucket",
    messagingSenderId: "your messaging sender id"
};
var fire = firebase.initializeApp(config);
fire.auth().signInWithEmailAndPassword('your email', 'your password')
export default fire;
