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
import { Snackbar, Slide, Alert } from "@mui/material";

const SERVER_URL = process.env.REACT_APP_SERVER_URL;
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
        console.log(res.data);
        this.setState({
          loggedIn: true,
          profileData: res.data,
          activeStep: 1,
          accessToken: res.data.access_token,
        });

        setRefresh = setInterval(() => {
          this.refreshCall();
        }, (res.data.expires_in - 120) * 1000);
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

  componentWillUnmount() {
    clearInterval(setRefresh);
  }

  async refreshCall() {
    this.setState({ error: true });

    await axios
      .get(`${SERVER_URL}/auth/refresh`, { withCredentials: true })
      .then((res) => {
        this.setState({
          accessToken: res.data.access_token,
          loggedIn: true,
        });

        setTimeout(() => {
          this.setState({ error: false });
        }, 2000);
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
          console.log(err);
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
          console.log(err);
        });
    };

    const TransitionRight = (props) => {
      return <Slide {...props} direction="right" />;
    };

    return (
      <main>
        <div className="gameScreen">
          <ParticlesBackground />
          {gameStart && !songEnd ? (
            <Gameplay audioData={trackData} scorePoints={scorePoints} />
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
        <Snackbar
          open={error}
          TransitionComponent={TransitionRight}
          anchorOrigin={{ vertical: "top", horizontal: "left" }}
        >
          <Alert severity="error" sx={{ width: "100%" }}>
            There was an error processing your request, please try again.
          </Alert>
        </Snackbar>
      </main>
    );
  }
}
