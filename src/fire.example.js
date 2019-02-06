import firebase from 'firebase'
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
export default fire;
