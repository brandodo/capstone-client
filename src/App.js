import React, { Component } from "react";
import HorizontalStepper from "./components/HorizontalStepper/HorizontalStepper";
import Login from "./components/Login/Login";
import SearchSongs from "./components/SearchSongs/SearchSongs";
import "./App.scss";
import axios from "axios";

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

export default class App extends Component {
  state = {
    activeStep: 0,
    loggedIn: false,
    isAuthenticating: true,
    profileData: null,
  };

  componentDidMount() {
    axios
      .get(`${SERVER_URL}/auth/profile`, { withCredentials: true })
      .then((res) => {
        console.log(res.data);
        this.setState({
          isAuthenticating: false,
          loggedIn: true,
          profileData: res.data,
          activeStep: 1,
        });
      })
      .catch((err) => {
        if (err.response.status === 401) {
          this.setState({
            isAuthenticating: false,
            loggedIn: false,
          });
        } else {
          console.log("Error authenticating", err);
        }
      });
  }

  render() {
    const { loggedIn, isAuthenticating, profileData } = this.state;

    return (
      <main>
        <div className="gameScreen">
          <HorizontalStepper activeStep={this.state.activeStep} />
        </div>
        <div className="sidebar">
          {loggedIn ? (
            profileData && <SearchSongs profileData={profileData} />
          ) : (
            <Login />
          )}
        </div>
      </main>
    );
  }
}
