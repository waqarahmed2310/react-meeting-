import React, { Component } from "react";
import "../../App.css";
import * as firebase from "firebase";
import swal from "sweetalert";
import background from "../../images/background.jpg";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker
} from "react-google-maps";

const provider = new firebase.auth.FacebookAuthProvider();

class Home extends Component {
  constructor() {
    super();

    this.state = {
      user: false,
      uid: "",
      map: false,
      first: true,
      second: false,
      third: false
    };

    this.SignIn = this.SignIn.bind(this);
    this.first = this.first.bind(this);
    this.second = this.second.bind(this);
    this.third = this.third.bind(this);
    this.insertData = this.insertData.bind(this);
    this.updateCoords = this.updateCoords.bind(this);
  }

  componentWillMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({ user: true, uid: user.uid });
        localStorage.setItem("uid", user.uid);
        this.setPosition();
      } else {
        this.setState({ user: false });
      }
    });
  }

  componentDidUpdate() {
    const db = firebase.firestore();
    const { uid } = this.state;
    debugger;

    db.collection("users")
      .where("uid", "==", uid)
      .get()
      .then(querySnapshot => {
        if (querySnapshot.size) {
          this.props.history.push("/Dashboard");
        }
      });
  }

  login() {
    firebase
      .auth()
      .signInWithPopup(provider)
      .then(function(result) {
        var user = result.user;
      })
      .catch(err => {
        swal(err.message, "", "error");
      });
  }

  setPosition() {
    navigator.geolocation.getCurrentPosition(position => {
      this.setState({
        coords: position.coords,
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      });
    });
  }

  updateCoords({ latitude, longitude }) {
    this.setState({ coords: { longitude, latitude }, longitude, latitude });
    console.log(latitude, longitude);
  }

  SignIn() {
    firebase
      .auth()
      .signInWithPopup(provider)
      .then(function(result) {
        var user = result.user;
        console.log(user);
      })
      .catch(err => {
        swal(err.message, "", "error");
      });
  }

  first() {
    var nickname = document.getElementById("nickname").value;
    var number = document.getElementById("number").value;
    const db = firebase.firestore();

    if (!nickname || !number) {
      swal("Fill all the fields", "", "error");
    } else {
      this.setState({
        first: false,
        second: true,
        third: false,
        nickname,
        number
      });
    }
  }

  second() {
    const db = firebase.firestore();
    var storageRef = firebase.storage().ref();
    var imagesRef = storageRef.child(
      "images/ad_" +
        Math.random()
          .toString()
          .substring(2, 6)
    );
    var file = document.getElementById("image1").files[0];
    var file2 = document.getElementById("image2").files[0];
    var file3 = document.getElementById("image3").files[0];
    var a = this;
    if (!file || !file2 || !file3) {
      swal("Select 3 pictures", "", "warning");
    } else {
      return new Promise((resolve, reject) => {
        imagesRef
          .put(file)
          .then(function(sanpshot) {
            imagesRef
              .getDownloadURL()
              .then(function(url1) {
                return new Promise((resolve, reject) => {
                  imagesRef
                    .put(file2)
                    .then(function(sanpshot) {
                      imagesRef
                        .getDownloadURL()
                        .then(function(url2) {
                          return new Promise((resolve, reject) => {
                            imagesRef
                              .put(file3)
                              .then(function(sanpshot) {
                                imagesRef
                                  .getDownloadURL()
                                  .then(url3 => {
                                    a.setState({
                                      first: false,
                                      second: false,
                                      third: true,
                                      pic1: url1,
                                      pic2: url2,
                                      pic3: url3
                                    });
                                  })
                                  .catch(function(error) {
                                    swal("Error in uploading", "", "error");
                                  });
                              })
                              .catch(e => {
                                swal("Error in uploading", "", "error");
                              });
                          });
                        })
                        .catch(function(error) {
                          swal("Error in uploading", "", "error");
                        });
                    })
                    .catch(e => {
                      swal("Error in uploading", "", "error");
                    });
                });
              })
              .catch(function(error) {
                swal("Error in uploading", "", "error");
              });
          })
          .catch(e => {
            swal("Error in uploading", "", "error");
          });
      });
    }
  }

  third() {
    const { uid, nickname, number, pic1, pic2, pic3 } = this.state;
    const db = firebase.firestore();

    var coffee = document.getElementById("coffee").checked;
    var juice = document.getElementById("juice").checked;
    var cocktail = document.getElementById("cocktail").checked;
    var min1 = document.getElementById("min1").checked;
    var min2 = document.getElementById("min2").checked;
    var min3 = document.getElementById("min3").checked;

    if (coffee) {
      coffee = true;
    }

    if (juice) {
      juice = true;
    }

    if (cocktail) {
      cocktail = true;
    }

    if (min1) {
      min1 = true;
    }

    if (min2) {
      min2 = true;
    }

    if (min3) {
      min3 = true;
    }

    debugger;

    if ((!coffee && !juice && !cocktail) || (!min1 && !min2 && !min3)) {
      swal("Select atleast one value of each", "", "warning");
    } else {
      this.setState({
        map: true,
        third: false,
        coffee,
        juice,
        cocktail,
        min1,
        min2,
        min3
      });
    }
  }

  insertData() {
    const {
      coffee,
      juice,
      cocktail,
      min1,
      min2,
      min3,
      uid,
      nickname,
      number,
      pic1,
      pic2,
      pic3,
      longitude,
      latitude
    } = this.state;
    const db = firebase.firestore();

    db.collection("users")
      .doc(uid)
      .set({
        coffee,
        juice,
        cocktail,
        min1,
        min2,
        min3,
        nickname,
        number,
        pic1,
        pic2,
        pic3,
        longitude,
        latitude,
        uid
      })
      .then(res => {
        swal("Data inseted successful", "", "success");
      })
      .catch(err => {
        swal(err.message, "", "error");
      });
  }

  renderfirst() {
    return (
      <div className="row mt-5">
        <div className="col-md-2" />
        <div className="col-md-8">
          <div className="card">
            <div className="card-header text-center" id="color">
              {/* <img src={background} className="img img-responsive" height="60" width="1020" /> */}
              <h2 id="profile">Profile</h2>
            </div>
            <div className="card-body">
              {/* <span class="input-group-addon"><i class="glyphicon glyphicon-user"></i></span> */}
              {/* <label>Nickname:</label> */}
              {/* <input type="text" className="form-control" id="nickname" /> */}
              <div class="input-group">
                <span class="input-group-addon">
                  <i class="glyphicon glyphicon-user" />
                </span>
                <input
                  id="email"
                  type="text"
                  class="form-control"
                  name="email"
                  placeholder="Email"
                />
              </div>

              <label className="mt-5">Number:</label>
              <input type="number" className="form-control" id="number" />
              <button
                className="btn btn-primary mt-4"
                id="btn_color"
                onClick={this.first}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-2" />
      </div>
    );
  }

  renderSecond() {
    return (
      <div className="row mt-5">
        <div className="col-md-2" />
        <div className="col-md-8">
          <div className="card">
            <div className="card-header text-center" id="color">
              <h2 id="profile">Profile</h2>
            </div>
            <div className="card-body">
              <label>Nickname:</label>
              <input type="file" className="form-control" id="image1" />
              <input type="file" className="form-control" id="image2" />
              <input type="file" className="form-control" id="image3" />
              <button
                className="btn btn-primary mt-4"
                id="btn_color"
                onClick={this.second}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-2" />
      </div>
    );
  }

  renderThird() {
    return (
      <div className="row mt-5">
        <div className="col-md-2" />
        <div className="col-md-8">
          <div className="card">
            <div className="card-header text-center" id="color">
              <h2 id="profile">Profile</h2>
            </div>
            <div className="card-body">
              <label className="mt-5">Select Beverages:</label>
              <br />
              <input type="checkbox" id="coffee" value="Coffee" />
              Coffee
              <br />
              <input type="checkbox" id="juice" value="Juice" />
              Juice
              <br />
              <input type="checkbox" id="cocktail" value="Cocktail" />
              Cocktail
              <br />
              <label className="mt-5">Duration of meeting:</label>
              <br />
              <input type="checkbox" id="min1" value="20 min" />
              20 min
              <br />
              <input type="checkbox" id="min2" value="60 min" />
              60 min
              <br />
              <input type="checkbox" id="min3" value="120 min" />
              120 min
              <br />
              <button
                className="btn btn-primary mt-4"
                id="btn_color"
                onClick={this.third}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-2" />
      </div>
    );
  }

  renderMap() {
    const { coords } = this.state;
    return (
      <div className="container mt-3">
        {coords && (
          <MyMapComponent
            isMarkerShown
            googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
            loadingElement={<div style={{ height: `100%` }} />}
            containerElement={<div style={{ height: `80vh` }} />}
            mapElement={<div style={{ height: `100%` }} />}
            coords={coords}
            updateCoords={this.updateCoords}
          />
        )}
        <button
          className="btn btn-primary mt-4"
          id="btn_color"
          onClick={this.insertData}
        >
          Submit
        </button>
      </div>
    );
  }

  render() {
    const { user, first, second, third, map } = this.state;
    return (
      <div>
        {!user ? (
          <div id="a">
            <div>
              <center>
                <img
                  src={background}
                  width="100%"
                  height="700"
                  alt="Background"
                />
                <button className="btn" id="btn_fb" onClick={this.SignIn}>
                  Log In with Facebook
                </button>
              </center>
            </div>
          </div>
        ) : (
          <div>
            {first && !second && !third && this.renderfirst()}
            {!first && second && !third && this.renderSecond()}
            {!first && !second && third && this.renderThird()}
            {map && this.renderMap()}
          </div>
        )}
      </div>
    );
  }
}

const MyMapComponent = withScriptjs(
  withGoogleMap(props => (
    <GoogleMap
      defaultZoom={14}
      center={{ lat: props.coords.latitude, lng: props.coords.longitude }}
    >
      {props.isMarkerShown && (
        <Marker
          position={{ lat: props.coords.latitude, lng: props.coords.longitude }}
          draggable={true}
          onDragEnd={position => {
            props.updateCoords({
              latitude: position.latLng.lat(),
              longitude: position.latLng.lng()
            });
          }}
        />
      )}
    </GoogleMap>
  ))
);

export default Home;
