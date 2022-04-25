import React from "react";
import "./GameOptions.scss";

export default function GameOptions({
  resetState,
  playAgain,
  setPlay,
  setOptions,
}) {
  return (
    <div className="sidebar__gameOptions">
      <div
        className="sidebar__playAgain"
        onClick={() => {
          setOptions(false);
          setPlay(true);
          playAgain();
        }}
      >
        Play Again
      </div>
      <div className="sidebar__newSong" onClick={() => resetState()}>
        Choose a New Song
      </div>
    </div>
  );
}
