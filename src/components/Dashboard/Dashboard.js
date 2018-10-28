import React, { Component } from "react";
import Navbar from "../Navbar/Navbar";

class Dashboard extends Component {
  constructor() {
    super();

    this.state = {};
  }

  render() {
    const { isMeeting } = this.state;

    return (
      <div>
        {/* <Navbar /> */}
        <br />
        <div className=" d-flex justify-content-center">
          <br />
          <h2>You Haven't done any meeting yet!</h2>
        </div>
        <br />
        <div className=" d-flex justify-content-center">
          <a href="/" className="btn btn-primary">
            <b>Set a meeting!</b>
          </a>
        </div>
      </div>
    );
  }
}

export default Dashboard;
