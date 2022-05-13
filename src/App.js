import React, { Component } from "react";
import {
  TitleScreen,
  HorizontalStepper,
  Login,
  SearchSongs,
  TrackPlayer,
  Gameplay,
  GameOver,
  ParticlesBackground,
  UserProfile,
  AlertModal,
} from "./components/index";

import "./App.scss";
import axios from "axios";
import { API_URL } from "./config/index";

const SERVER_URL = API_URL;
const SPOTIFY_BASE_URL = "https://api.spotify.com/v1";
let setRefresh;

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
    stepperShow: false,
    playerScores: [],
    error: false,
    combo: 0,
    lastCircle: 0,
    comboArr: [],
    maxCombo: 0,
    multiplier: 1,
  };

  componentDidMount() {
    axios
      .get(`${SERVER_URL}/auth/profile`, { withCredentials: true })
      .then((res) => {
        this.setState({
          loggedIn: true,
          profileData: res.data,
          activeStep: 1,
          accessToken: res.data.access_token,
        });

        setRefresh = setInterval(() => {
          this.refreshCall(false);
        }, (res.data.expires_in - 120) * 1000);
      })
      .catch((err) => {
        if (err.response.status === 401) {
          this.setState({
            loggedIn: false,
          });
        } else {
          return `Error authenticating, ${err}`;
        }
      });
  }

  componentWillUnmount() {
    clearInterval(setRefresh);
  }

  refreshCall(bool) {
    if (bool) {
      this.setState({ error: true });

      setTimeout(() => {
        this.setState({ error: false });
      }, 2000);
    }

    axios
      .get(`${SERVER_URL}/auth/refresh`, { withCredentials: true })
      .then((res) => {
        this.setState({
          accessToken: res.data.access_token,
          loggedIn: true,
        });
      })
      .catch((err) => {
        return `Could not refresh token, ${err}`;
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
      stepperShow,
      playerScores,
      error,
      combo,
      multiplier,
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

    const scorePoints = (counter) => {
      if (counter - this.state.lastCircle === 1) {
        this.setState({ combo: this.state.combo + 1, lastCircle: counter });
      } else {
        this.setState({
          combo: 0,
          lastCircle: counter,
          comboArr: [...this.state.comboArr, this.state.combo],
        });
      }

      switch (this.state.combo) {
        case 10:
          this.setState({ multiplier: 2 });
          break;
        case 20:
          this.setState({ multiplier: 4 });
          break;
        case 30:
          this.setState({ multiplier: 6 });
          break;
        case 40:
          this.setState({ multiplier: 8 });
          break;
        case 0:
          this.setState({ multiplier: 1 });
      }

      const score = 200 * this.state.multiplier;

      this.setState({ score: this.state.score + score });
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
        stepperShow: true,
      });
    };

    const playAgain = () => {
      this.setState({ songEnd: false, score: 0 });
    };

    const showStepper = (bool) => {
      this.setState({ stepperShow: bool });
    };

    const recordScore = (song, artist, points, combo) => {
      const tempArr = [...this.state.comboArr, combo];
      const maxCombo = Math.max(...tempArr);

      axios
        .post(`${SERVER_URL}/score`, {
          player_id: profileData.spotify_id,
          song,
          artist,
          score: points,
          max_combo: maxCombo,
        })
        .then((res) => {
          this.setState({ playerScores: res.data });
        })
        .catch((err) => {
          return `Failed to post score, ${err}`;
        });
    };

    const logout = () => {
      axios
        .get(`${SERVER_URL}/auth/logout`)
        .then((res) => {
          this.setState({
            loggedIn: false,
            profileData: null,
            activeStep: 0,
            accessToken: "",
          });
        })
        .catch((err) => {
          return `Failed to logout, ${err}`;
        });
    };

    return (
      <main>
        <AlertModal show={error} />
        <div className="gameScreen">
          <ParticlesBackground />
          {gameStart && !songEnd ? (
            <Gameplay
              audioData={trackData}
              scorePoints={scorePoints}
              score={multiplier * 200}
            />
          ) : songEnd ? (
            <GameOver playerScores={playerScores} />
          ) : (
            <>
              {profileData && (
                <UserProfile
                  profile={profileData}
                  show={stepperShow}
                  logout={logout}
                  showStepper={showStepper}
                />
              )}

              <TitleScreen show={stepperShow} />
            </>
          )}

          <HorizontalStepper
            activeStep={this.state.activeStep}
            show={stepperShow}
            showStepper={showStepper}
          />
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
                recordScore={recordScore}
                combo={combo}
                multiplier={multiplier}
              />
            ) : (
              profileData && (
                <SearchSongs
                  refreshCall={() => this.refreshCall()}
                  getTrackData={getTrackData}
                  apiHeader={apiHeader}
                  showStepper={showStepper}
                  show={stepperShow}
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
