import firebase from "firebase";
import "firebase/firestore";
import { initFirestorter, Collection, Document } from "firestorter";

var config = {
  apiKey: "AIzaSyC5Le8mO8Xv4E6gOGrkGv3CZCUaWN29vOk",
  authDomain: "todo-1f257.firebaseapp.com",
  databaseURL: "https://todo-1f257.firebaseio.com",
  projectId: "todo-1f257",
  storageBucket: "todo-1f257.appspot.com",
  messagingSenderId: "1098866052410"
};

firebase.initializeApp(config);

initFirestorter({ firebase: firebase });

const TodosList = new Collection(`todos`);
TodosList.query = TodosList.ref
  .orderBy("TodoTimeStamp");

const getTodo = TodoID => {
  return new Document(`todos/${TodoID}`);
};

export { TodosList, getTodo };
