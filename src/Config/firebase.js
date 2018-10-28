import { Component } from "react";

class firebase extends Component {
  render() {
    // Initialize Firebase
    const config = {
      apiKey: "AIzaSyAA27Zp7ggqEoGrBQgY8-WdXnlLOZIowyo",
      authDomain: "reactmeetingapp.firebaseapp.com",
      databaseURL: "https://reactmeetingapp.firebaseio.com",
      projectId: "reactmeetingapp",
      storageBucket: "",
      messagingSenderId: "441578927485"
    };
    firebase.initializeApp(config);
  }
}

export default firebase;
