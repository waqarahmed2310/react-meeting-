import React, { Component } from 'react';
import './App.css';
import * as firebase from './config/firebase'
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"
import Routes from './Config/router'


const providerx = firebase.provider;

class App extends Component {


constructor(prop){

	super(prop)


	this.state = {
		coords: null,
		currentuser: null
	};

	// this.login = this.login.bind(this);
	this.logout = this.logout.bind(this);
	this.updateCoords = this.updateCoords.bind(this);
}

	


	

	logout() {
		//firebase.auth.signOut().then()
		firebase.auth.signOut().then(function (result) {
			var user = result;
			console.log(user);
			// this.setState({
			// 	currentuser: null
			// })


		}).catch(function (error) {
			console.error("error** ", error);
		});
	}

	setPosition() {
		navigator.geolocation.getCurrentPosition(position => {
			this.setState({ coords: position.coords })
		});
	}

	updateCoords({ latitude, longitude }) {
		this.setState({ coords: { latitude, longitude } })
	}



  render() {

  

	 
	  const { coords } = this.state;

	  return (
		  <div>

			  <h1>This is header!</h1>
			  <Routes />
			  <h1>This is footer!</h1>

			  {
				  
				  


				  /* { <div> <button onClick={this.login}>Login with facebook shareef!</button> 
				  <button onClick={this.logout}>Logout with facebook shareef!</button>
				</div>}
			  {coords && <MyMapComponent
				  isMarkerShown
				  googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
				  loadingElement={<div style={{ height: `100%` }} />}
				  containerElement={<div style={{ height: `100vh` }} />}
				  mapElement={<div style={{ height: `100%` }} />}
				  coords={coords}
				  updateCoords={this.updateCoords}
			  />} */}
		  </div>
	  )
  }

}


const MyMapComponent = withScriptjs(withGoogleMap((props) =>
	<GoogleMap
		defaultZoom={14}
		center={{ lat: props.coords.latitude, lng: props.coords.longitude }}
	>
		{props.isMarkerShown &&
			<Marker
				position={{ lat: props.coords.latitude, lng: props.coords.longitude }}
				draggable={true}
				onDragEnd={position => {
					props.updateCoords({ latitude: position.latLng.lat(), longitude: position.latLng.lng() })
				}}
			/>}
	</GoogleMap>
))


export default App;