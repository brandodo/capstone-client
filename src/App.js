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
    profileData: null,
    accessToken: "",
  };

  componentDidMount() {
    axios
      .get(`${SERVER_URL}/auth/profile`, { withCredentials: true })
      .then((res) => {
        console.log(res.data);
        this.setState({
          loggedIn: true,
          profileData: res.data,
          activeStep: 1,
          accessToken: res.data.access_token,
        });

        setInterval(() => {
          this.refreshToken();
        }, (res.data.expires_in - 60) * 1000);
      })
      .catch((err) => {
        if (err.response.status === 401) {
          this.setState({
            loggedIn: false,
          });
        } else {
          console.log("Error authenticating", err);
        }
      });
  }

  refreshToken() {
    axios
      .get(`${SERVER_URL}/auth/refresh`, { withCredentials: true })
      .then((res) => {
        this.setState({ accessToken: res.data.access_token });
      });
  }

  render() {
    const { loggedIn, profileData, accessToken } = this.state;

    return (
      <main>
        <div className="gameScreen">
          <HorizontalStepper activeStep={this.state.activeStep} />
        </div>
        <div className="sidebar">
          {loggedIn ? (
            profileData && <SearchSongs accessToken={accessToken} />
          ) : (
            <Login />
          )}
        </div>
      </main>
    );
  }
}
