import React, { Component } from "react";
import TitleScreen from "./components/TitleScreen/TitleScreen";
import HorizontalStepper from "./components/HorizontalStepper/HorizontalStepper";
import Login from "./components/Login/Login";
import SearchSongs from "./components/SearchSongs/SearchSongs";
import TrackPlayer from "./components/TrackPlayer/TrackPlayer";
import Gameplay from "./components/Gameplay/Gameplay";
import GameOver from "./components/GameOver/GameOver";
import "./App.scss";
import axios from "axios";
import ParticlesBackground from "./components/ParticlesBackground/ParticlesBackground";
import UserProfile from "./components/UserProfile/UserProfile";

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
    currentTrack: {},
    trackData: [],
    gameStart: false,
    songEnd: false,
    score: 0,
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
      }, (3600 - 120) * 1000);
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
      songEnd,
      currentTrack,
      trackData,
      gameStart,
      score,
    } = this.state;

    const apiHeader = {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${accessToken}`,
    };

    const getTrackData = (trackId, selectedTrack) => {
      axios
        .get(`${SPOTIFY_BASE_URL}/audio-analysis/${trackId}`, {
          headers: apiHeader,
        })
        .then((res) => {
          console.log(res);
          this.setState({
            trackUri: selectedTrack.uri,
            currentTrack: selectedTrack,
            songSelected: true,
            trackData: res.data,
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

    const scorePoints = () => {
      this.setState({ score: this.state.score + 200 });
    };

    const showGameEnd = () => {
      this.setState({ songEnd: true });
    };

    const resetState = () => {
      this.setState({
        gameStart: false,
        songEnd: false,
        songSelected: false,
        score: 0,
        activeStep: 1,
      });
    };

    const playAgain = () => {
      this.setState({ songEnd: false, score: 0 });
    };

    return (
      <main>
        <div className="gameScreen">
          <ParticlesBackground />
          {gameStart && !songEnd ? (
            <Gameplay audioData={trackData} scorePoints={scorePoints} />
          ) : songEnd ? (
            <GameOver />
          ) : (
            <>
              {profileData && <UserProfile profile={profileData} />}

              <TitleScreen />
            </>
          )}

          <HorizontalStepper activeStep={this.state.activeStep} />
        </div>
        <div className="sidebar">
          {loggedIn ? (
            songSelected ? (
              <TrackPlayer
                accessToken={accessToken}
                currentTrack={currentTrack}
                startGame={startGame}
                points={score}
                showGameEnd={showGameEnd}
                resetState={resetState}
                playAgain={playAgain}
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
