import React, { Component } from "react";
import HorizontalStepper from "./components/HorizontalStepper/HorizontalStepper";
import Login from "./components/Login/Login";
import SearchSongs from "./components/SearchSongs/SearchSongs";
import TrackPlayer from "./components/TrackPlayer/TrackPlayer";
import "./App.scss";
import axios from "axios";
import Gameplay from "./components/Gameplay/Gameplay";

const SERVER_URL = process.env.REACT_APP_SERVER_URL;
const SPOTIFY_BASE_URL = "https://api.spotify.com/v1";

export default class App extends Component {
  state = {
    activeStep: 0,
    loggedIn: false,
    profileData: null,
    accessToken: "",
    songSelected: false,
    trackUri: "",
    trackData: [],
    gameStart: false,
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

        this.refreshToken();
      })
      .catch((err) => {
        if (err.response.status === 401) {
          this.setState({
            loggedIn: false,
          });
          this.refreshCall();
        } else {
          console.log("Error authenticating", err);
        }
      });
  }

  refreshToken() {
    const setRefresh = () => {
      setInterval(() => {
        this.refreshCall();
      }, (3600 - 60) * 1000);
    };

    clearInterval(setRefresh);
    setRefresh();
  }

  refreshCall() {
    axios
      .get(`${SERVER_URL}/auth/refresh`, { withCredentials: true })
      .then((res) => {
        console.log(res.data.access_token);
        this.setState({ accessToken: res.data.access_token, loggedIn: true });
      })
      .catch((err) => {
        console.log("Could not refresh token", err);
      });
  }

  render() {
    const {
      loggedIn,
      profileData,
      accessToken,
      songSelected,
      trackUri,
      trackData,
      gameStart,
    } = this.state;

    const apiHeader = {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${accessToken}`,
    };

    const getTrackData = (trackId, track) => {
      axios
        .get(`${SPOTIFY_BASE_URL}/audio-analysis/${trackId}`, {
          headers: apiHeader,
        })
        .then((res) => {
          console.log(res);
          this.setState({
            trackUri: track,
            songSelected: true,
            trackData: res.data.beats,
            activeStep: 2,
          });
        })
        .catch((err) => {
          if (err.response.status === 401) {
            this.refreshCall();
          }
        });
    };

    const startGame = () => {
      this.setState({ gameStart: true });
    };

    return (
      <main>
        <div className="gameScreen">
          {gameStart && <Gameplay beats={trackData} />}
          <HorizontalStepper activeStep={this.state.activeStep} />
        </div>
        <div className="sidebar">
          {loggedIn ? (
            songSelected ? (
              <TrackPlayer
                accessToken={accessToken}
                trackUri={trackUri}
                startGame={startGame}
              />
            ) : (
              profileData && (
                <SearchSongs
                  refreshCall={() => this.refreshCall()}
                  getTrackData={getTrackData}
                  apiHeader={apiHeader}
                />
              )
            )
          ) : (
            <Login />
          )}
        </div>
      </main>
    );
  }
}
