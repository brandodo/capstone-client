import React, { useState, useEffect } from "react";
import SpotifyPlayer from "react-spotify-web-playback";
import GameOptions from "../GameOptions/GameOptions";
import CurrentTrack from "./CurrentTrack";
import Score from "./Score";
import { useTransition, animated, config } from "react-spring";
import "./TrackPlayer.scss";

export default function TrackPlayer({
  accessToken,
  currentTrack,
  startGame,
  points,
  showGameEnd,
  resetState,
  playAgain,
}) {
  const [play, setPlay] = useState(false);
  const [timer, setTimer] = useState();
  const [options, setOptions] = useState(false);
  const [show, setShow] = useState(false);
  const { images } = currentTrack.album;
  const { uri, name, artists } = currentTrack;

  const optionsTransition = useTransition(options, {
    from: { x: -100, opacity: 0 },
    enter: { x: 0, opacity: 1 },
    leave: { x: 100, opacity: 0 },
    config: config.slow,
  });

  const trackTransition = useTransition(show, {
    from: { y: -300, opacity: 0 },
    enter: { y: 0, opacity: 1 },
    leave: { y: 300, opacity: 0 },
    config: config.slow,
  });

  useEffect(() => setShow(true), []);

  useEffect(() => setPlay(true), [uri]);

  useEffect(() => {
    if (timer > 0) {
      setTimeout(() => {
        showGameEnd();
        setOptions(true);
      }, timer + 3000);
    }
  }, [timer]);

  if (!accessToken) return null;

  return trackTransition(
    (styles, show) =>
      show && (
        <animated.div className="sidebar__playerContainer" style={styles}>
          <Score points={points} />
          <CurrentTrack images={images} name={name} artists={artists} />
          {optionsTransition(
            (styles, options) =>
              options && (
                <animated.div
                  className="sidebar__animatedContainer"
                  style={styles}
                >
                  <GameOptions
                    resetState={resetState}
                    playAgain={playAgain}
                    setPlay={setPlay}
                    setOptions={setOptions}
                  />
                </animated.div>
              )
          )}
          <div className="sidebar__spotifyContainer">
            <SpotifyPlayer
              className="sidebar__spotifyPlayer"
              token={accessToken}
              callback={(state) => {
                if (!state.isPlaying) setPlay(false);
                if (state.isPlaying) {
                  startGame();
                  setTimer(state.track.durationMs);
                }
              }}
              play={play}
              uris={uri ? [uri] : []}
              styles={{
                activeColor: "green",
                sliderColor: "#1db954",
                loaderSize: 10,
                display: "none",
              }}
              syncExternalDevice={false}
              autoPlay
            />
          </div>
        </animated.div>
      )
  );
}
