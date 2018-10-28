import React, { Component } from "react";
import "../../App.css";
import * as firebase from "firebase";
import { NavLink } from "react-router-dom";
import swal from "sweetalert";

class Navbar extends Component {

    constructor() {
        super();

        this.state = {
            user: false
        }

        this.logOut = this.logOut.bind(this);
    }

    
    componentDidMount() {
        
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                console.log("user", user);
                console.log("user", user.email);
                
                this.setState({ user: true });
            }
            else {
                console.log('no user');
            }
        });
        
    }
    
    logOut() {

        firebase.auth().signOut().then(() => {
            debugger
            swal("Logged Out successfully", "", "success");
            // this.props.history.replace("/SignIn");
            this.setState({ user: false });            
        }).catch(function (error) {
            swal(error.message, '', 'error');
        });
    }

    render() {
        const { user } = this.state;

        return (
            <div>
                <nav className="navbar navbar-expand-sm navbar-dark flex-row bg-primary" id="color">
                    <a className="navbar-brand" href="/" id="navHeading">
                        Meeting App
                    </a>
                    <button className="navbar-toggler ml-lg-0" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon" />
                    </button>

                    {user ?
                        <div className="collapse navbar-collapse float-right" id="navbarSupportedContent">
                            <ul className="nav navbar-nav ml-auto" id="navbar">
                                <li className="nav-item">
                                    <NavLink exact activeClassName="active" to="/">
                                        <span className="nav-link">
                                            Home <span className="sr-only" />
                                        </span>
                                    </NavLink>
                                </li>

                                <li className="nav-item">
                                    <NavLink activeClassName="active" to="/Dashboard">
                                        <span className="nav-link">
                                            Dashboard <span className="sr-only" />
                                        </span>
                                    </NavLink>
                                </li>


                                <li className="nav-item dropdown">
                                    <a className="nav-link dropdown-toggle mr-3 mr-lg-0" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        <i className="fa fa-user" />
                                        <span className="caret" />
                                    </a>
                                    <div className="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdownMenuLink">
                                        <span className="dropdown-item" onClick={this.logOut}>
                                            LogOut
                                        </span>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        :
                        <div className="collapse navbar-collapse float-right" id="navbarSupportedContent">
                            <ul className="nav navbar-nav ml-auto">
                                <li className="nav-item">
                                    <NavLink exact activeClassName="active" to="/">
                                        <span className="nav-link">
                                            Home <span className="sr-only" />
                                        </span>
                                    </NavLink>
                                </li>
                            </ul>
                        </div>
                    }

                </nav>
            </div>
        )
    }
}

export default Navbar;