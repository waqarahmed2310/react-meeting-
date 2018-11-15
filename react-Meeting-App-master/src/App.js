import React, { Component } from 'react';
import FbAuth from './Constant/FbAuthentication/FbAuth';
import CustomRoutes from './Router/Router';
import history from './Router/History';
import firebase from './Constant/Firebase/Firebase';
import Map from './Component/Map/GoogleMap';
import Dashboard from './Component/Dashboard/Dashboard';
import CheckLoginUser from './Constant/CheckLoginUser/CheckLoginUser';

class App extends Component {

  componentWillMount() {
    this.authListener();
  }

  authListener() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        const currentUser = firebase.auth().currentUser.uid; // getting current user uid
        console.log(currentUser);
        firebase.database()
          .ref(`USER_DATA/${currentUser}`)
          .once('value').then(function (snapshot) {
            console.log(snapshot.val())
            snapshot.val() && (history.replace('/dashboard'));
            !snapshot.val() && (history.replace('/profile'));
          })
          .catch((error) => {
            console.log(error);
          })
      }

      else {
        console.log("Please SignIn")
        history.replace('/authentication')
      }
    });
  }

  render() {
    return (
      <div className="App">
      </div>
    );
  }
}

export default App;