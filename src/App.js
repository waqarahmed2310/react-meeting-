import React, { Component } from 'react';
import './App.css';
// import firebase from './Config/firebase';
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import createBrowserHistory from "history/createBrowserHistory";
import * as firebase from "firebase";
import Home from "./components/Home/Home";
import Navbar from "./components/Navbar/Navbar";
import Dashboard from "./components/Dashboard/Dashboard";


const customHistory = createBrowserHistory();
// const provider = new firebase.auth.FacebookAuthProvider();

class App extends Component {
  constructor() {
    super();

    this.state = {
      user: false    
    }
  }
  componentWillMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({ user: true, uid: user.uid });
        localStorage.setItem("uid", user.uid);
      } else {
        this.setState({ user: false });
      }
    });
  }

  render() {
    const { user } = this.state;
    
    return (
      <Router history={customHistory}>
        <div>
          <Navbar />
          {/* <Home /> */}
          <Route exact path="/" component={Home} />
          <Route path="/Dashboard" render={() => (user ? <Dashboard /> : <Redirect to="/" />)} />
          {/* <Route path="/" Component={} /> */}
        </div>
      </Router>
    );
  }
}

export default App;
