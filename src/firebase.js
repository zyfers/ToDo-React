import firebase from "firebase"

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyDK5EWUpAJP8PKLQcWRGuqvg9Wye5cHlU8",
    authDomain: "todo-app-e83cc.firebaseapp.com",
    databaseURL: "https://todo-app-e83cc.firebaseio.com",
    projectId: "todo-app-e83cc",
    storageBucket: "todo-app-e83cc.appspot.com",
    messagingSenderId: "991717558354",
    appId: "1:991717558354:web:186f33bbd983c06c4cb78b",
    measurementId: "G-0F9M7QSTSD"
})

const db = firebaseApp.firestore()

export default db